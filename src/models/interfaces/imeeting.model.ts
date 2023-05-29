import { Types } from 'mongoose';
import { Document } from "mongoose";
import { AutoMap } from '@automapper/classes'

export class Meeting extends Document {
    googleCalendarId: string
    googleEventId: string
    eventId: Types.ObjectId;
    userId: Types.ObjectId;

    @AutoMap()
    _id: Types.ObjectId;

    @AutoMap()
    attendee: Array<object>

    @AutoMap()
    startTime: string

    @AutoMap()
    endTime: string
}