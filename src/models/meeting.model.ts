import { Schema, model, Types } from 'mongoose'
import { Meeting } from './interfaces/imeeting.model'

const meetingSchema = new Schema<Meeting>({
    googleCalendarId: {
        type: String,
        required: true
    },
    googleEventId: {
        type: String,
        required: true
    },
    event: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Event"
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    attendee: {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
})

const MeetingModel = model<Meeting>('Meeting', meetingSchema)

export default MeetingModel