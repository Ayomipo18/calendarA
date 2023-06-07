import { Schema, model, Types } from 'mongoose'
import { Meeting } from './interfaces/imeeting.model'
import { EventType } from '../helpers/constants'

const meetingSchema = new Schema<Meeting>({
    googleCalendarId: {
        type: String,
        required: true
    },
    googleEventId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: EventType,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    invitee: [{
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }],
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, { timestamps: true })

const MeetingModel = model<Meeting>('Meeting', meetingSchema)

export default MeetingModel