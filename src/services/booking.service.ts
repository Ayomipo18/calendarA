import { injectable, inject } from "inversify";
import TYPES from "../types";
import IBookingService from './interfaces/ibooking.service';
import IRepositoryManager from '../repositories/interfaces/irepositoryManager';
import { HttpException } from '../exceptions/HttpException'
import { calendar, getOAuth2Client, googleApi } from '../config/config'
import moment, { Moment } from 'moment';
import SuccessResponse from '../helpers/SuccessResponse';
import { 
    GetBookingDTO, 
    GetBookingResponse, 
    GetInterval, 
    BusyInterval, 
    FreeInterval, 
    MomentDTO,
    AddUserDTO
} from '../dtos/BookingDTO';
import { BookingResponse } from "../dtos/BookingDTO";
import { EventResponse } from "../dtos/EventDTO";
import logger from "../logger";
import { TimeStatus, event } from "../helpers/constants";
import { mapper } from '../mappings/mapper';
import { Meeting } from "../models/interfaces/imeeting.model";
import { Event } from "../models/interfaces/ievent.model";

const { inBetweenBreak } = event;

@injectable()
export default class BookingService implements IBookingService {
    private _repository;

    constructor(@inject(TYPES.IRepositoryManager) repository: IRepositoryManager) {
        this._repository = repository;
    }
    
    public async getAvailability(eventId: string, inputDate: GetBookingDTO): Promise<SuccessResponse<GetBookingResponse>> {
        let date;

        if (!inputDate.date || inputDate.date == null) {
            date = new Date()
        } else {
            date = inputDate.date
        }

        const formattedIntervals = await this.getIntervals(eventId, date);

        const intervals = new Array<GetInterval>();

        formattedIntervals.forEach(formattedInterval => {
            let getInterval = new GetInterval();
            getInterval.startTime = moment(formattedInterval.startTime).format('h:mm');
            getInterval.endTime = moment(formattedInterval.endTime).format('h:mm');
            getInterval.status = formattedInterval.status;
            intervals.push(getInterval);
        })

        return new SuccessResponse<GetBookingResponse>(200, 'Booking availability returned Successfully', intervals);
    }

    public async addUser(eventId: string, addUser: AddUserDTO): Promise<SuccessResponse<BookingResponse>> {
        let valid = false;
        let intervalsIndex = 0;
        const intervalCheck = moment(addUser.date).set({
            'h': addUser.startTime.getHours(), 
            'm': addUser.startTime.getMinutes()
        });

        const intervals = await this.getIntervals(eventId, addUser.date);

        while (intervalsIndex < intervals.length) {
            if (intervalCheck.isSame(intervals[intervalsIndex].startTime) 
            && intervals[intervalsIndex].status == TimeStatus.unavailable) {
                throw new HttpException(400, 'Chosen time not available');
            } else if(intervalCheck.isSame(intervals[intervalsIndex].startTime)) {
                valid = true;
                break
            }
            intervalsIndex++;
        }

        if (!valid) throw new HttpException(400, 'Invalid start time');

        const eventData = await this.addEventToGoogleCalendar(eventId, intervalCheck, addUser.email)
        
        const meeting = await this._repository.Meeting.create({
            googleCalendarId: eventData.googleData.data.iCalUID,
            googleEventId: eventData.googleData.data.id,
            user: eventData.event.user,
            event: eventId,
            startTime: eventData.googleData.data.start?.dateTime,
            endTime: eventData.googleData.data.end?.dateTime,
            attendee: {name: addUser.name, email: addUser.email}
        })

        const addUserResponseDto = mapper.map(meeting, Meeting, BookingResponse);
        addUserResponseDto.eventDetails = mapper.map(eventData.event, Event, EventResponse);
        
        return new SuccessResponse<BookingResponse>(200, 'Invitee added successfully', addUserResponseDto)
    }

    private async getIntervals(eventId: string, inputDate: Date ): Promise<Array<FreeInterval>> {
        const event = await this._repository.Event.findById(eventId);
        if (!event) throw new HttpException(404, 'Event not found');

        const user = await this._repository.User.findById(event.user);
        if (!user) throw new HttpException(404, 'User not found');

        const calendarId = user.email;
        const data = await this.getGoogleCalendar(user.email, user.googleRefreshToken, inputDate);
        const busyItems: Array<typeof googleApi.Schema$TimePeriod> = data.data!.calendars![calendarId].busy!;
        const busyIntervals = Array<BusyInterval>(), freeIntervals = new Array<FreeInterval>();
        const duration = event.durationInMins;
        const date = inputDate;

        let startTime = moment(date).set({
            'h': +event.startTime.split(":")[0], 
            'm': +event.startTime.split(":")[1]
        });
        
        const endTime = moment(date).set({
            'h': +event.endTime.split(":")[0], 
            'm': +event.endTime.split(":")[1]
        });

        //generate all intervals with status available
        while (startTime.isSameOrBefore(endTime)) {
            let freeInterval = new FreeInterval();
            freeInterval.startTime = startTime.clone();
            if(startTime.clone().add(duration, 'm').isAfter(endTime)) break;
            freeInterval.endTime = startTime.clone().add(duration, 'm');
            freeInterval.status = TimeStatus.available;
            freeIntervals.push(freeInterval);
            startTime.add(duration + inBetweenBreak, 'm');
        }

        //convert busy to Moment format
        busyItems.forEach(busyItem => {
            let busyInterval = new BusyInterval();
            busyInterval.start = moment(busyItem.start);
            busyInterval.end = moment(busyItem.end);
            busyIntervals.push(busyInterval);
        });

        const intervals: Array<FreeInterval> = await this.processInterval(busyIntervals, freeIntervals);
        
        return intervals;
    }


    private async getGoogleCalendar(email: string, refreshToken: string, date: Date) {
        try {
            const data = await calendar.freebusy.query({
                auth: getOAuth2Client(refreshToken),
                requestBody: {
                    timeMin: moment(date).startOf('day').format(),
                    timeMax: moment(date).endOf('day').format(),
                    items: [{
                        id: email
                    }],
                    timeZone: 'GMT+1'
                }
            })

            return data;
        } catch(error) {
            logger.error(`Error from Booking FreeBusy Query(Invalid Parameters):: ${error}`);
            throw new HttpException(400, 'Error processing this request');
        }
    }


    private async processInterval(busyInterval: Array<BusyInterval>, freeInterval: Array<FreeInterval>): Promise<Array<FreeInterval>> {
        let freeIntervalIndex = 0, busyIntervalIndex = 0;
        let now
        
        while(busyIntervalIndex < busyInterval.length && freeIntervalIndex < freeInterval.length) {
            let startTime = this.getLaterTime(
                freeInterval[freeIntervalIndex].startTime, 
                busyInterval[busyIntervalIndex].start
            );

            let endTime = this.getEarlierTime(
                freeInterval[freeIntervalIndex].endTime, 
                busyInterval[busyIntervalIndex].end
            );

            //if there is an overlap
            if(startTime.isBefore(endTime)) {
                freeInterval[freeIntervalIndex].status = TimeStatus.unavailable;
                freeIntervalIndex++;
            } 
            
            //if there is no overlap
            else if(freeInterval[freeIntervalIndex].endTime.isBefore(busyInterval[busyIntervalIndex].end)) {
                freeIntervalIndex++;
            } 
            
            //if the current busyInterval cannot match the current freeInterval, move to the next
            //busyInterval to test against the freeInterval
            else {
                busyIntervalIndex++;
            }
        }

        freeIntervalIndex = 0;

        //check against current time
        while (freeIntervalIndex < freeInterval.length) {
            now = moment().set('second', 0);
            if(now.isAfter(freeInterval[freeIntervalIndex].startTime) 
            && freeInterval[freeIntervalIndex].status == TimeStatus.available) {
                freeInterval[freeIntervalIndex].status = TimeStatus.unavailable;
            }
            freeIntervalIndex++;
        }

        return freeInterval;
    }

    private getLaterTime(freeMoment: MomentDTO, busyMoment: MomentDTO): MomentDTO {
        return freeMoment.isAfter(busyMoment) ? freeMoment : busyMoment;
    }

    private getEarlierTime(freeMoment: MomentDTO, busyMoment: MomentDTO): MomentDTO {
        return freeMoment.isBefore(busyMoment) ? freeMoment : busyMoment;
    }

    private async addEventToGoogleCalendar(eventId: string, startTime: Moment, inviteeEmail: string) {
        const event = await this._repository.Event.findById(eventId);
        if (!event) throw new HttpException(404, 'Event not found');

        const user = await this._repository.User.findById(event.user);
        if (!user) throw new HttpException(404, 'User not found');

        try {
            const data = await calendar.events.insert({
                auth: getOAuth2Client(user.googleRefreshToken),
                calendarId: user.email,
                requestBody: {
                    summary: event.summary,
                    description: event.description,
                    start: {
                      dateTime: startTime.format(),
                      timeZone: 'GMT+1',
                    },
                    end: {
                        dateTime: startTime.add(event.durationInMins, 'm').format(),
                        timeZone: 'GMT+1',
                      },
                    attendees: [
                      {email: inviteeEmail}
                    ]
                  }
            })

            return { googleData: data, event: event} ;
        } catch (error) {
            logger.error(`Error from Booking >> Inserting into Google Calendar(Invalid Parameters):: ${error}`);
            throw new HttpException(400, 'Error processing this request');   
        }
    }
}