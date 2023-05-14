import { Schema, model } from 'mongoose'
import { Event} from './interfaces/ievent.model'

const eventSchema = new  Schema<Event>({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    duration_in_mins: {
        type: Number,
        required: true
    }
})

const EventModel = model<Event>('Event', eventSchema)

export default EventModel