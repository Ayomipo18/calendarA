import { TimeStatus } from "../helpers/constants";
import { Moment } from 'moment';

export class GetBookingDTO {
    public date: Date;
};

export class AddInviteeDTO {
    public name: string;
    public email: string;
    public start: Date;
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