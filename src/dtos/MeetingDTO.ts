import { AutoMap } from '@automapper/classes'
import { Types } from "mongoose";
import { EventResponse } from './EventDTO';

export class MeetingResponse {
    @AutoMap()
    public _id: Types.ObjectId;

    @AutoMap()
    public attendee: Array<object>

    @AutoMap()
    public event: EventResponse

    @AutoMap()
    startTime: string

    @AutoMap()
    endTime: string
};