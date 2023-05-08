import { Types } from 'mongoose';

export interface IMeeting {
    google_calendar_id: string
    google_event_id: string
    event_title: string;
    description: string;
    event_date: Date;
    start_time: Date;
    end_time: Date;
    host_id: Types.ObjectId;
    attendee_id: Types.ObjectId;
}