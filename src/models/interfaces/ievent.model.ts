import { Types } from 'mongoose';
import { Document } from "mongoose";
import { EventType } from '../../helpers/constants';
import { AutoMap } from '@automapper/classes'

export class Event extends Document {
    @AutoMap()
    durationInMins: number;

    @AutoMap()
    startTime: string;

    @AutoMap()
    endTime: string;

    @AutoMap()
    userId: Types.ObjectId;

    @AutoMap()
    eventType: EventType;

    @AutoMap()
    description: string;

    @AutoMap()
    summary: string;

    @AutoMap()
    slug: string;
}