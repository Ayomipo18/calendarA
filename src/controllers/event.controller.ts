import { Request, Response, NextFunction } from 'express';
import IServiceManager from '../services/interfaces/iserviceManager';
import { injectable, inject } from "inversify";
import TYPES from "../types";

@injectable()
export default class EventController {
    private _service: IServiceManager;

    constructor(@inject(TYPES.IServiceManager) service: IServiceManager) {
        this._service = service;
    }

    public async getAllEvents(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const data = await this._service.Event.getAllEvents();
            return res.status(data.status).json({data: data.data, message: data.message});
        } catch(error) {
            next(error);
        }
    }
}