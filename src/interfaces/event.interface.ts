import { Types } from 'mongoose';

export interface IEvent {
    duration_in_mins: number;
    start_time: string;
    end_time: string;
    user_id: Types.ObjectId;
}