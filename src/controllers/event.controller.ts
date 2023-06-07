import { Request, Response, NextFunction } from 'express';
import IServiceManager from '../services/interfaces/iserviceManager';
import { injectable, inject } from "inversify";
import TYPES from "../di/types";
import { EventParameter } from '../helpers/ResourceParameter';
import { ValidatedRequest } from 'express-joi-validation'
import { 
    eventResourceSchema, 
    createEventSchema, 
    updateEventSchema, 
    getEventSchema 
} from '../validators/event.validator';
import { resourceParameter } from '../helpers/constants';
import { LoggedInUser } from '../dtos/UserDTO';
import { CreateEventDTO, UpdateEventDTO } from '../dtos/EventDTO';

@injectable()
export default class EventController {
    private _service: IServiceManager;

    constructor(@inject(TYPES.IServiceManager) service: IServiceManager) {
        this._service = service;
    }

    public async getAllEvents(req: ValidatedRequest<eventResourceSchema>, res: Response, next: NextFunction): Promise<any>{
        try {
            const eventParameters : EventParameter = req.query;
            eventParameters.pageNumber ??= resourceParameter.pageNumber;
            eventParameters.pageSize ??= resourceParameter.pageSize;
            const loggedInUser: LoggedInUser = req.user;
            const data = await this._service.Event.getAllEvents(eventParameters, loggedInUser);
            return res.status(data.status).json({data: data.data, meta: data.meta, message: data.message});
        } catch(error) {
            next(error);
        }
    }

    public async createEvent(req: ValidatedRequest<createEventSchema>, res: Response, next: NextFunction): Promise<any>{
        try {
            const createEventDTO: CreateEventDTO = req.body;
            const loggedInUser: LoggedInUser = req.user;
            const data = await this._service.Event.createEvent(createEventDTO, loggedInUser);
            return res.status(data.status).json({data: data.data, message: data.message});
        } catch(error) {
            next(error);
        }
    }

    public async updateEvent(req: ValidatedRequest<updateEventSchema>, res: Response, next: NextFunction): Promise<any>{
        try {
            const updateEventDTO: UpdateEventDTO = req.body;
            const loggedInUser: LoggedInUser = req.user;
            const data = await this._service.Event.updateEvent(updateEventDTO, req.params.eventId, loggedInUser);
            return res.status(data.status).json({data: data.data, message: data.message});
        } catch(error) {
            next(error);
        }
    }

    public async deleteEvent(req: ValidatedRequest<getEventSchema>, res: Response, next: NextFunction): Promise<any>{
        try {
            const loggedInUser: LoggedInUser = req.user;
            const data = await this._service.Event.deleteEvent(req.params.eventId, loggedInUser);
            return res.status(data.status).json({data: data.data, message: data.message});
        } catch(error) {
            next(error);
        }
    }

    public async getEvent(req: ValidatedRequest<getEventSchema>, res: Response, next: NextFunction): Promise<any>{
        try {
            const loggedInUser: LoggedInUser = req.user;
            const data = await this._service.Event.getEvent(req.params.eventId, loggedInUser);
            return res.status(data.status).json({data: data.data, message: data.message});
        } catch(error) {
            next(error);
        }
    }
}