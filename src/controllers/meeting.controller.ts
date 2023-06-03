import { Request, Response, NextFunction } from 'express';
import IServiceManager from '../services/interfaces/iserviceManager';
import { injectable, inject } from "inversify";
import TYPES from "../types";
import { AuthDTO } from '../dtos/AuthDTO';

@injectable()
export default class MeetingController {
    private _service: IServiceManager;

    constructor(@inject(TYPES.IServiceManager) service: IServiceManager) {
        this._service = service;
    }

    public async getAllMeetings(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const data = await this._service.Meeting.getAllMeetings();
            return res.status(data.status).json({data: data.data, message: data.message});
        } catch(error) {
            next(error);
        }
    }
}