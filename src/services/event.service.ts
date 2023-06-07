import IRepositoryManager from '../repositories/interfaces/irepositoryManager';
import IEventService from './interfaces/ievent.service';
import { injectable, inject } from "inversify";
import TYPES from '../di/types';
import { mapper } from '../mappings/mapper';
import { Event } from '../models/interfaces/ievent.model';
import { EventResponse, CreateEventDTO, UpdateEventDTO } from '../dtos/EventDTO';
import { EventParameter } from '../helpers/ResourceParameter';
import { LoggedInUser } from '../dtos/UserDTO';
import { PagedResponse, Meta } from '../helpers/PagedResponse';
import SuccessResponse from '../helpers/SuccessResponse';
import { HttpException } from '../exceptions/HttpException';
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';

@injectable()
export default class EventService implements IEventService {
    private _repository;

    constructor(@inject(TYPES.IRepositoryManager) repository: IRepositoryManager) {
        this._repository = repository;
    }

    public async getAllEvents(eventParameters: EventParameter, loggedInUser: LoggedInUser): Promise<PagedResponse<Array<EventResponse>>> {
        let eventsQuery = this._repository.Event.find({user: loggedInUser.id});

        if(eventParameters.search) {
            eventsQuery.where({
                $or: [
                    {description: {$regex: eventParameters.search, $options: 'i'}},
                    {summary: {$regex: eventParameters.search, $options: 'i'}},
                    {slug: {$regex: eventParameters.search, $options: 'i'}}
                ]
            })
        }

        if (eventParameters.type && eventParameters.type.length > 0) {
            eventsQuery.where({
                type: {
                    $in : eventParameters.type
                }
            })
        }
        
        if(eventParameters.sort) {
            eventsQuery.sort(eventParameters.sort)
        } else {
            eventsQuery.sort('-createdAt')
        }

        const count = await eventsQuery.clone().countDocuments();
        const events = await eventsQuery.skip(eventParameters.pageSize * (eventParameters.pageNumber - 1))
        .limit(eventParameters.pageSize)

        const totalPages = Math.ceil(count / eventParameters.pageSize);
        const nextPage = eventParameters.pageNumber < totalPages ? eventParameters.pageNumber + 1: null
        const previousPage = (eventParameters.pageNumber > 1 && eventParameters.pageNumber <= totalPages) 
        ? eventParameters.pageNumber - 1: null
        const meta = new Meta(nextPage, previousPage, totalPages, eventParameters.pageSize, count);

        const eventsResponseDto = mapper.mapArray(events, Event, EventResponse);

        return new PagedResponse<Array<EventResponse>>(StatusCodes.OK, 'Events returned succesfully', eventsResponseDto, meta)
    }

    public async createEvent(createEventDTO: CreateEventDTO, loggedInUser: LoggedInUser): Promise<SuccessResponse<EventResponse>> {
        const eventExists = await this._repository.Event.findOne({
            $or: [
                {summary: createEventDTO.summary}, {slug: createEventDTO.slug}
            ], 
            user: loggedInUser.id
        })
        if (eventExists) throw new HttpException(StatusCodes.BAD_REQUEST, 'Event exists already')

        const model = mapper.map(createEventDTO, CreateEventDTO, Event)
        const time = this.formatStartEndTime(createEventDTO);
        model.startTime = time.startTime;
        model.endTime = time.endTime;
        model.user = new Types.ObjectId(loggedInUser.id);
        
        const event = this._repository.Event.create(model);
        await event.save();

        const eventResponseDto = mapper.map(event, Event, EventResponse);
        return new SuccessResponse<EventResponse>(StatusCodes.CREATED, 'Event created successfully', eventResponseDto)
    }

    public async updateEvent(updateEventDTO: UpdateEventDTO, eventId: string, loggedInUser: LoggedInUser): Promise<SuccessResponse<EventResponse>> {
        const event = await this._repository.Event.findOne({
            _id: eventId, user: loggedInUser.id
        });
        if (!event) throw new HttpException(StatusCodes.NOT_FOUND, 'Event does not exist');

        const eventDuplicate = await this._repository.Event.findOne({
            $or: [
                {summary: updateEventDTO.summary}, {slug: updateEventDTO.slug}
            ],
            user: loggedInUser.id
        })
        if (eventDuplicate) throw new HttpException(StatusCodes.BAD_REQUEST, 'Event exists already')

        const time = this.formatStartEndTime(updateEventDTO);
        mapper.mutate(updateEventDTO, event, UpdateEventDTO, Event)
        event.startTime = time.startTime;
        event.endTime = time.endTime;
        await this._repository.Event.updateOne({_id: eventId}, event)

        const eventResponseDto = mapper.map(event, Event, EventResponse);
        return new SuccessResponse<EventResponse>(StatusCodes.OK, 'Event updated successfully', eventResponseDto)
    }

    public async deleteEvent(eventId: string, loggedInUser: LoggedInUser): Promise<SuccessResponse<null>> {
        const deleteResult = await this._repository.Event.deleteOne({
            _id: eventId, user: loggedInUser.id
        })

        if (!deleteResult.acknowledged || deleteResult.deletedCount < 1) {
            throw new HttpException(StatusCodes.NOT_FOUND, 'Event does not exist');
        }

        return new SuccessResponse<null>(StatusCodes.NO_CONTENT, 'Event deleted successfully', null)
    }

    public async getEvent(eventId: string, loggedInUser: LoggedInUser): Promise<SuccessResponse<EventResponse>> {
        const event = await this._repository.Event.findOne({
            _id: eventId, user: loggedInUser.id
        })

        if(!event) throw new HttpException(StatusCodes.NOT_FOUND, 'Event does not exist');

        const eventResponseDto = mapper.map(event, Event, EventResponse);
        return new SuccessResponse<EventResponse>(StatusCodes.OK, 'Event returned successfully', eventResponseDto)
    }

    private formatStartEndTime(input: CreateEventDTO) {
        const startTime = `${input.startTime.getHours()}:${input.startTime.getMinutes()}`;
        const endTime = `${input.endTime.getHours()}:${input.endTime.getMinutes()}`;

        return { "startTime": startTime, "endTime": endTime };
    }
}