import { AutoMap } from '@automapper/classes'
import { Types } from "mongoose";
import { EventType } from '../helpers/constants';

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
    public userId: Types.ObjectId;

    @AutoMap()
    public eventType: EventType;

    @AutoMap()
    public description: string;

    @AutoMap()
    public summary: string;

    @AutoMap()
    public slug: string;
}