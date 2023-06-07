import { AutoMap } from '@automapper/classes'
import { Types } from "mongoose";
import { EventType } from '../helpers/constants';

export class CreateEventDTO {
    @AutoMap()
    public durationInMins: number;

    public startTime: Date;

    public endTime: Date;

    @AutoMap()
    public type: string;

    @AutoMap()
    public summary: string;

    @AutoMap()
    public description: string;

    @AutoMap()
    public slug: string
}

export class UpdateEventDTO extends CreateEventDTO{}

export class EventResponse {
    @AutoMap()
    public _id: Types.ObjectId;

    @AutoMap()
    public durationInMins: number;

    @AutoMap()
    public startTime: string;

    @AutoMap()
    public endTime: string;

    @AutoMap()
    public user: Types.ObjectId;

    @AutoMap()
    public type: EventType;

    @AutoMap()
    public description: string;

    @AutoMap()
    public summary: string;

    @AutoMap()
    public slug: string;
}