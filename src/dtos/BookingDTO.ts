import { TimeStatus } from "../helpers/constants";
import { Moment } from 'moment';
import { AutoMap } from '@automapper/classes'
import { Types } from "mongoose";
import { EventResponse } from './EventDTO';

export class GetBookingDTO {
    public date?: Date;
};

export class AddUserDTO {
    public name: string;
    public email: string;
    public date: Date;
    public startTime: Date;
}

export class BusyInterval {
    public start: Moment;
    public end: Moment;
};

export class FreeInterval {
    public startTime: Moment;
    public endTime: Moment;
    public status: TimeStatus
};

export class GetInterval {
    public startTime: string;
    public endTime: string;
    public status: TimeStatus
};

export type MomentDTO = Moment;

export type GetBookingResponse = Array<GetInterval>;

export class BookingResponse {
    @AutoMap()
    public _id: Types.ObjectId;

    @AutoMap()
    public attendee: Array<object>

    @AutoMap()
    public eventDetails: EventResponse

    @AutoMap()
    startTime: string

    @AutoMap()
    endTime: string
};