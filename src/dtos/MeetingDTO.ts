import { AutoMap } from '@automapper/classes'
import { Types } from "mongoose";

export class MeetingResponse {
    @AutoMap()
    public _id: Types.ObjectId;

    @AutoMap()
    public invitee: Array<object>

    @AutoMap()
    public start: Date

    @AutoMap()
    public end: Date

    @AutoMap()
    public type: string

    @AutoMap()
    public description: string

    @AutoMap()
    public summary: string

    @AutoMap()
    public host: Types.ObjectId
};