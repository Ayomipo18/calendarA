import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from "inversify";
import TYPES from "../types";
import IServiceManager from "../services/interfaces/iserviceManager";
import { 
    GetBookingDTO, 
    AddUserDTO 
} from "../dtos/BookingDTO";
import { ValidatedRequest } from 'express-joi-validation'
import {
     getAvailabilitySchema, 
     addUserSchema
} from '../validators/booking.validator';

@injectable()
export default class BookingController {
    private _service: IServiceManager;

    constructor(@inject(TYPES.IServiceManager) service: IServiceManager) {
        this._service = service;
    }
    
    public async getAvailability(req: ValidatedRequest<getAvailabilitySchema>, res: Response, next: NextFunction){
        try {
            const GetBookingDTO: GetBookingDTO = req.query;
            const data = await this._service.Booking.getAvailability(req.params.eventId, GetBookingDTO);
            return res.status(data.status).json({data: data.data, message: data.message});
        } catch (error) {
            next(error);
        }
    }

    public async addUser(req: ValidatedRequest<addUserSchema>, res: Response, next: NextFunction){
        try {
            const addUserDTO: AddUserDTO = req.body;
            const data = await this._service.Booking.addUser(req.params.eventId, addUserDTO);
            return res.status(data.status).json({data: data.data, message: data.message});
        } catch (error) {
            next(error);
        }
    }
}