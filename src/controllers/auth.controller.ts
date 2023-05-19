import { Request, Response, NextFunction } from 'express';
import IServiceManager from '../services/interfaces/iserviceManager';
import { injectable, inject } from "inversify";
import TYPES from "../types";
import { AuthDTO } from '../dtos/AuthDTO';

@injectable()
export default class AuthController {
    private _service: IServiceManager;

    constructor(@inject(TYPES.IServiceManager) service: IServiceManager) {
        this._service = service;
    }

    public async authorize(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const data = await this._service.Auth.authorize();
            return res.status(200).json(data.data);
        } catch(error) {
            next(error);
        }
    }

    public async getGoogleUser(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const code: AuthDTO = req.query;
            const data = await this._service.Auth.getGoogleUser(code);
            return res.status(200).json(data.data);
        }catch (error) {
            next(error);
        }
    }
}