import { injectable, inject } from "inversify";
import TYPES from "../types";
import ICalendarService from './interfaces/icalendar.service';
import IRepositoryManager from '../repositories/interfaces/irepositoryManager';
import { HttpException } from '../exceptions/HttpException'
import { calendar, getOAuth2Client } from '../config/config'
import moment from 'moment';
import SuccessResponse from '../helpers/SuccessResponse';
import { GetCalendarDTO, GetCalendarReponse } from '../dtos/CalendarDTO';
import logger from "../logger";

@injectable()
export default class CalendarService implements ICalendarService {
    private _repository;

    constructor(@inject(TYPES.IRepositoryManager) repository: IRepositoryManager) {
        this._repository = repository;
    }
    
    public async getCalendar(user_id: string, inputDate: GetCalendarDTO): Promise<SuccessResponse<GetCalendarReponse>> {
        const user = await this._repository.Calendar.findById(user_id);
        let date;

        if (!user) throw new HttpException(404, 'User not found');

        if (!inputDate.date || inputDate.date == null) {
            date = new Date()
        } else {
            date = new Date(inputDate.date!);
        }

        try {
            const data = await calendar.freebusy.query({
                auth: getOAuth2Client(user.refresh_token),
                requestBody: {
                    timeMin: moment(date).startOf('day').format(),
                    timeMax: moment(date).endOf('day').format(),
                    items: [{
                        id: user.email
                    }],
                    timeZone: 'GMT+1'
                }
            })

            const data2 = { freeTimes: [], busyTimes: [] }
    
            return new SuccessResponse<GetCalendarReponse>(200, 'Calendar returned Successfully', data2);

        } catch(error) {
            logger.error(`Error from Calendar FreeBusy Query(Invalid Parameters):: ${error}`);
            throw new HttpException(400, 'Error processing this request');
        }
    }
}