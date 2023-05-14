import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from "inversify";
import TYPES from "../types";
import IServiceManager from "../services/interfaces/iserviceManager";
import { GetCalendarDTO } from "../dtos/CalendarDTO";

@injectable()
export default class CalendarController {
    private _service: IServiceManager;

    constructor(@inject(TYPES.IServiceManager) service: IServiceManager) {
        this._service = service;
    }

    public async getCalendar(req: Request, res: Response, next: NextFunction){
        try {
            const getCalendarDto: GetCalendarDTO = req.query;
            const data = await this._service.Calendar.getCalendar(req.params.userId, getCalendarDto);
            return res.status(200).json(data.data);
        } catch (error) {
            next(error);
        }
    }
}