import { Request, Response, NextFunction } from 'express';
import IServiceManager from '../services/interfaces/iserviceManager';
import { injectable, inject } from "inversify";
import TYPES from "../di/types";
import { MeetingParameter } from '../helpers/ResourceParameter';
import { ValidatedRequest } from 'express-joi-validation'
import { meetingResourceSchema } from '../validators/meeting.validator';
import { resourceParameter } from '../helpers/constants';
import { LoggedInUser } from '../dtos/UserDTO';

@injectable()
export default class MeetingController {
    private _service: IServiceManager;

    constructor(@inject(TYPES.IServiceManager) service: IServiceManager) {
        this._service = service;
    }

    public async getAllMeetings(req: ValidatedRequest<meetingResourceSchema>, res: Response, next: NextFunction): Promise<any>{
        try {
            const meetingParameters : MeetingParameter = req.query;
            meetingParameters.pageNumber ??= resourceParameter.pageNumber;
            meetingParameters.pageSize ??= resourceParameter.pageSize;
            const loggedInUser: LoggedInUser = req.user;
            const data = await this._service.Meeting.getAllMeetings(meetingParameters, loggedInUser);
            return res.status(data.status).json({data: data.data, meta: data.meta, message: data.message});
        } catch(error) {
            next(error);
        }
    }
}