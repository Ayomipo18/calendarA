import IRepositoryManager from '../repositories/interfaces/irepositoryManager';
import IEventService from './interfaces/ievent.service';
import { injectable, inject } from "inversify";
import TYPES from '../types';
import SuccessResponse from '../helpers/SuccessResponse';
import { mapper } from '../mappings/mapper';
import { Event } from '../models/interfaces/ievent.model';
import { EventResponse } from '../dtos/EventDTO';

@injectable()
export default class EventService implements IEventService {
    private _repository;

    constructor(@inject(TYPES.IRepositoryManager) repository: IRepositoryManager) {
        this._repository = repository;
    }

    public async getAllEvents(): Promise<SuccessResponse<Array<EventResponse>>> {
        const events = await this._repository.Event.find({});

        const eventsResponseDto = mapper.mapArray(events, Event, EventResponse);

        return new SuccessResponse<Array<EventResponse>>(200, 'Events returned succesfully', eventsResponseDto)
    }
}