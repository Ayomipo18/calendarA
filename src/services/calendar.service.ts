import { injectable, inject } from "inversify";
import TYPES from "../types";
import ICalendarService from './interfaces/icalendar.service';
import IRepositoryManager from '../repositories/interfaces/irepositoryManager';
import { HttpException } from '../exceptions/HttpException'
import { calendar, getOAuth2Client, googleApi } from '../config/config'
import moment from 'moment';
import SuccessResponse from '../helpers/SuccessResponse';
import { 
    GetCalendarDTO, 
    GetCalendarReponse, 
    GetInterval, 
    BusyInterval, 
    FreeInterval, 
    MomentDTO
} from '../dtos/CalendarDTO';
import logger from "../logger";
import { Types } from "mongoose";
import { TimeStatus, inBetweenBreak } from "../helpers/constants";

@injectable()
export default class CalendarService implements ICalendarService {
    private _repository;

    constructor(@inject(TYPES.IRepositoryManager) repository: IRepositoryManager) {
        this._repository = repository;
    }
    
    public async getCalendar(userId: string, inputDate: GetCalendarDTO): Promise<SuccessResponse<GetCalendarReponse>> {
        const formattedIntervals = await this.getIntervals(userId, inputDate);

        const intervals = new Array<GetInterval>();

        formattedIntervals.forEach(formattedInterval => {
            let getInterval = new GetInterval();
            getInterval.startTime = moment(formattedInterval.startTime).format('h:mm');
            getInterval.endTime = moment(formattedInterval.endTime).format('h:mm');
            getInterval.status = formattedInterval.status;
            intervals.push(getInterval);
        })

        return new SuccessResponse<GetCalendarReponse>(200, 'Calendar returned Successfully', intervals);
    }

    private async getIntervals(userId: string, inputDate: GetCalendarDTO ): Promise<Array<FreeInterval>> {
        const user = await this._repository.User.findById(userId);
        if (!user) throw new HttpException(404, 'User not found');

        const event = await this._repository.Event.findOne({userId: userId});
        if (!event) throw new HttpException(404, 'Event not found');

        const calendarId = user.email;
        const data = await this.getGoogleCalendar(user.email, user.refreshToken, inputDate);
        const busyItems: Array<typeof googleApi.Schema$TimePeriod> = data.data!.calendars![calendarId].busy!;
        const busyIntervals = Array<BusyInterval>(), freeIntervals = new Array<FreeInterval>();
        const duration = event.durationInMins;
        const date = inputDate.date;

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


    private async getGoogleCalendar(email: string, refreshToken: string, inputDate: GetCalendarDTO) {
        let date;

        if (!inputDate.date || inputDate.date == null) {
            date = new Date()
        } else {
            date = new Date(inputDate.date!);
        }

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
            logger.error(`Error from Calendar FreeBusy Query(Invalid Parameters):: ${error}`);
            throw new HttpException(400, 'Error processing this request');
        }
    }


    private async processInterval(busyInterval: Array<BusyInterval>, freeInterval: Array<FreeInterval>): Promise<Array<FreeInterval>> {
        let freeIntervalIndex = 0, busyIntervalIndex = 0;

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

        return freeInterval;
    }

    private getLaterTime(freeMoment: MomentDTO, busyMoment: MomentDTO): MomentDTO {
        return freeMoment.isAfter(busyMoment) ? freeMoment : busyMoment;
    }

    private getEarlierTime(freeMoment: MomentDTO, busyMoment: MomentDTO): MomentDTO {
        return freeMoment.isBefore(busyMoment) ? freeMoment : busyMoment;
    }
}