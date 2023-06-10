import IRepositoryManager from '../repositories/interfaces/irepositoryManager';
import IMeetingService from './interfaces/imeeting.service';
import { injectable, inject } from "inversify";
import TYPES from '../di/types';
import { PagedResponse, Meta } from '../helpers/PagedResponse';
import { mapper } from '../mappings/mapper';
import { Meeting } from '../models/interfaces/imeeting.model';
import { MeetingResponse } from '../dtos/MeetingDTO';
import { MeetingParameter } from '../helpers/ResourceParameter';
import { LoggedInUser } from '../dtos/UserDTO';
import { StatusCodes } from 'http-status-codes';

@injectable()
export default class MeetingService implements IMeetingService {
    private _repository;

    constructor(@inject(TYPES.IRepositoryManager) repository: IRepositoryManager) {
        this._repository = repository;
    }

    public async getAllMeetings(meetingParameters: MeetingParameter, loggedInUser: LoggedInUser): Promise<PagedResponse<Array<MeetingResponse>>> {
        let meetingsQuery = this._repository.Meeting.find({user: loggedInUser.id});

        if(meetingParameters.search) {
            meetingsQuery.where({
                $or: [
                    {description: {$regex: meetingParameters.search, $options: 'i'}},
                    {summary: {$regex: meetingParameters.search, $options: 'i'}},
                ]
            })
        }

        if (meetingParameters.type && typeof meetingParameters.type === 'string') {
            meetingsQuery.where({ type: meetingParameters.type })
        } else if(meetingParameters.type && meetingParameters.type.length > 0) {
            meetingsQuery.where({
                type: {
                    $in : meetingParameters.type
                }
            })
        }

        if (meetingParameters.minStart && meetingParameters.maxEnd) {
            meetingsQuery.where({
                start: {
                    $gte: meetingParameters.minStart.setSeconds(0,0)
                },
                end: {
                    $lte: meetingParameters.maxEnd.setSeconds(0,0)
                }
            })
        }

        if (meetingParameters.inviteeEmail && typeof meetingParameters.inviteeEmail === 'string') {
            meetingsQuery.where({ 'invitee.email': meetingParameters.inviteeEmail })
        } else if (meetingParameters.inviteeEmail && meetingParameters.inviteeEmail.length > 0) {
            meetingsQuery.where({
                'invitee.email': {
                    $in: meetingParameters.inviteeEmail
                }
            })
        }
        
        if(meetingParameters.sort) {
            meetingsQuery.sort(meetingParameters.sort)
        } else {
            meetingsQuery.sort('-createdAt')
        }

        const count = await meetingsQuery.clone().countDocuments();
        const meetings = await meetingsQuery.skip(meetingParameters.pageSize * (meetingParameters.pageNumber - 1))
        .limit(meetingParameters.pageSize)

        const totalPages = Math.ceil(count / meetingParameters.pageSize);
        const nextPage = meetingParameters.pageNumber < totalPages ? meetingParameters.pageNumber + 1: null
        const previousPage = (meetingParameters.pageNumber > 1 && meetingParameters.pageNumber <= totalPages) 
        ? meetingParameters.pageNumber - 1: null
        const meta = new Meta(nextPage, previousPage, totalPages, meetingParameters.pageSize, count);

        const meetingsResponseDto = mapper.mapArray(meetings, Meeting, MeetingResponse);

        return new PagedResponse<Array<MeetingResponse>>(StatusCodes.OK, 'Meetings returned succesfully', meetingsResponseDto, meta)
    }
}