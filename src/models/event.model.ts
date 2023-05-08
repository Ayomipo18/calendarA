import { Schema, model } from 'mongoose'
import { IEvent } from '../interfaces/event.interface'

const eventSchema = new Schema<IEvent>({
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

const EventModel = model<IEvent>('Event', eventSchema)

export default EventModel