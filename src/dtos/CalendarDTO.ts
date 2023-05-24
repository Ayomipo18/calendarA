import { TimeStatus } from "../helpers/constants";
import { Moment } from 'moment';

export class GetCalendarDTO {
    public date?: string;
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

export type GetCalendarReponse = Array<GetInterval>;