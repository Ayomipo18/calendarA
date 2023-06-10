import { Types } from 'mongoose';
import { AutoMap } from '@automapper/classes'

export class Meeting{
    googleCalendarId: string
    googleEventId: string

    @AutoMap()
    _id: Types.ObjectId;

    @AutoMap()
    invitee: Array<object>;

    @AutoMap()
    type: string;

    @AutoMap()
    user: Types.ObjectId;

    @AutoMap()
    description: string;

    @AutoMap()
    summary: string;

    @AutoMap()
    start: Date

    @AutoMap()
    end: Date
}