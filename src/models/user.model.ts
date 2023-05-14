import { Schema, model } from 'mongoose'
import { User } from './interfaces/iuser.model'

const userSchema = new Schema<User>({
    google_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    }
})

const UserModel = model<User>('User', userSchema)

export default UserModel