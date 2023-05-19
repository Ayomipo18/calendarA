import { Document } from "mongoose";
import { Types } from "mongoose";
import { AutoMap } from '@automapper/classes'

export class User extends Document {
    @AutoMap()
    _id: Types.ObjectId;

    @AutoMap()
    googleId: string;

    @AutoMap()
    name: string;

    @AutoMap()
    email: string;

    @AutoMap()
    refreshToken: string;
}