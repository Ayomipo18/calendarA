import IRepositoryManager from '../repositories/interfaces/irepositoryManager';
import IMeetingService from './interfaces/imeeting.service';
import { injectable, inject } from "inversify";
import TYPES from '../types';
import SuccessResponse from '../helpers/SuccessResponse';
import { mapper } from '../mappings/mapper';
import { Meeting } from '../models/interfaces/imeeting.model';
import { MeetingResponse } from '../dtos/MeetingDTO';
import { Event } from '../models/interfaces/ievent.model';
import { EventResponse } from '../dtos/EventDTO';

@injectable()
export default class MeetingService implements IMeetingService {
    private _repository;

    constructor(@inject(TYPES.IRepositoryManager) repository: IRepositoryManager) {
        this._repository = repository;
    }

    public async getAllMeetings(): Promise<SuccessResponse<Array<MeetingResponse>>> {
        const meetings = await this._repository.Meeting.find({}).populate('event');

        const meetingsResponseDto = mapper.mapArray(meetings, Meeting, MeetingResponse);

        return new SuccessResponse<Array<MeetingResponse>>(200, 'Meetings returned succesfully', meetingsResponseDto)
    }
}