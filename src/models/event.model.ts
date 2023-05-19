import { Schema, model } from 'mongoose'
import { Event} from './interfaces/ievent.model'

const eventSchema = new Schema<Event>({
    userId: {
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
    }
})

const EventModel = model<Event>('Event', eventSchema)

export default EventModel