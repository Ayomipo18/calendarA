import { Types } from 'mongoose';
import { Document } from "mongoose";
import { AutoMap } from '@automapper/classes'

export class Meeting extends Document {
    googleCalendarId: string
    googleEventId: string
    user: Types.ObjectId;

    @AutoMap()
    _id: Types.ObjectId;

    @AutoMap()
    attendee: object;

    @AutoMap()
    event: Types.ObjectId;

    @AutoMap()
    startTime: string

    @AutoMap()
    endTime: string
}