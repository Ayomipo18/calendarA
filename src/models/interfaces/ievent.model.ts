import { Types } from 'mongoose';
import { AutoMap } from '@automapper/classes'

export class Event{
    @AutoMap()
    _id: Types.ObjectId;
    
    @AutoMap()
    durationInMins: number;

    @AutoMap()
    intervalBreak: number;

    @AutoMap()
    startTime: string;

    @AutoMap()
    endTime: string;

    @AutoMap()
    user: Types.ObjectId;

    @AutoMap()
    type: string;

    @AutoMap()
    description: string;

    @AutoMap()
    summary: string;

    @AutoMap()
    slug: string;
}