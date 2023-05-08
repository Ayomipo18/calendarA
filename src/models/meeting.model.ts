import { Schema, model } from 'mongoose'
import { IMeeting } from '../interfaces/meeting.interface'

const meetingSchema = new Schema<IMeeting>({
    google_calendar_id: {
        type: String,
        required: true
    },
    google_event_id: {
        type: String,
        required: true
    },
    event_title: {
        type: String,
        required: true
    },
    event_date: {
        type: Date,
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    host_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    attendee_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
})

const MeetingModel = model<IMeeting>('Meeting', meetingSchema)

export default MeetingModel