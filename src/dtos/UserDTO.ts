import { Types } from "mongoose";
import { AutoMap } from '@automapper/classes'

export class UserLoginResponse {
    @AutoMap()
    public name: string;

    @AutoMap()
    public email: string;

    @AutoMap()
    public _id: Types.ObjectId;
}

export class GetGoogleUser {
    public data: any;
    public refreshToken: string | null | undefined;
}