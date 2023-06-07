import { Types, Document } from 'mongoose';
import { EventType } from '../../helpers/constants';
import { AutoMap } from '@automapper/classes'

export class Event extends Document {
    @AutoMap()
    _id: Types.ObjectId;
    
    @AutoMap()
    durationInMins: number;

    @AutoMap()
    startTime: string;

    @AutoMap()
    endTime: string;

    @AutoMap()
    user: Types.ObjectId;

    @AutoMap()
    type: EventType;

    @AutoMap()
    description: string;

    @AutoMap()
    summary: string;

    @AutoMap()
    slug: string;
}