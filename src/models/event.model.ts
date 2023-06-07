import { Schema, model } from 'mongoose'
import { Event} from './interfaces/ievent.model'
import { EventType } from '../helpers/constants'

const eventSchema = new Schema<Event>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    durationInMins: {
        type: Number,
        required: true
    },
    intervalBreak : {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: EventType,
        default: EventType.standardEvent
    },
    description: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
}, { timestamps: true })

const EventModel = model<Event>('Event', eventSchema)

export default EventModel