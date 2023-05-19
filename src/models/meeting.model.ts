import { Schema, model } from 'mongoose'
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
    eventTitle: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    hostId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    attendeeId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
})

const MeetingModel = model<Meeting>('Meeting', meetingSchema)

export default MeetingModel