import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from "inversify";
import TYPES from "../di/types";
import IServiceManager from "../services/interfaces/iserviceManager";
import { 
    GetBookingDTO, 
    AddInviteeDTO 
} from "../dtos/BookingDTO";
import { ValidatedRequest } from 'express-joi-validation'
import {
     getAvailabilitySchema, 
     addInviteeSchema
} from '../validators/booking.validator';

@injectable()
export default class BookingController {
    private _service: IServiceManager;

    constructor(@inject(TYPES.IServiceManager) service: IServiceManager) {
        this._service = service;
    }
    
    public async getAvailability(req: ValidatedRequest<getAvailabilitySchema>, res: Response, next: NextFunction){
        try {
            const getBookingDTO: GetBookingDTO = req.query;
            const data = await this._service.Booking.getAvailability(req.params.eventId, getBookingDTO);
            return res.status(data.status).json({data: data.data, message: data.message});
        } catch (error) {
            next(error);
        }
    }

    public async addInvitee(req: ValidatedRequest<addInviteeSchema>, res: Response, next: NextFunction){
        try {
            const addInviteeDTO: AddInviteeDTO = req.body;
            const data = await this._service.Booking.addInvitee(req.params.eventId, addInviteeDTO);
            return res.status(data.status).json({data: data.data, message: data.message});
        } catch (error) {
            next(error);
        }
    }
}