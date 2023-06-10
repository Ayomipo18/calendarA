import { Types } from "mongoose";
import { AutoMap } from '@automapper/classes'

export class User {
    @AutoMap()
    _id: Types.ObjectId;

    @AutoMap()
    googleId: string;

    @AutoMap()
    name: string;

    @AutoMap()
    email: string;

    @AutoMap()
    googleRefreshToken: string;

    refreshToken: string;

    refreshTokenExpiryTime: Date; 
}