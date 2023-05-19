import { Types } from 'mongoose';
import { Document } from "mongoose";

export class Event extends Document {
    durationInMins: number;
    startTime: string;
    endTime: string;
    userId: Types.ObjectId;
}