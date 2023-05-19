import { Types } from 'mongoose';
import { Document } from "mongoose";

export class Meeting extends Document {
    googleCalendarId: string
    googleEventId: string
    eventTitle: string;
    description: string;
    eventDate: Date;
    startTime: Date;
    endTime: Date;
    hostId: Types.ObjectId;
    attendeeId: Types.ObjectId;
}