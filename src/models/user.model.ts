import { Schema, model } from 'mongoose'
import { IUser } from '../interfaces/user.interface'

const userSchema = new Schema<IUser>({
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

const UserModel = model<IUser>('User', userSchema)

export default UserModel