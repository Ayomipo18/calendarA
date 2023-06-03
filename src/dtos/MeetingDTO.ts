import { AutoMap } from '@automapper/classes'
import { Types } from "mongoose";

export class MeetingResponse {
    @AutoMap()
    public _id: Types.ObjectId;

    @AutoMap()
    public attendee: Array<object>

    @AutoMap()
    public event: Types.ObjectId;

    @AutoMap()
    startTime: string

    @AutoMap()
    endTime: string
};