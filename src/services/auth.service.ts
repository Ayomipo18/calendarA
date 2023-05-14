import User from '../models/user.model'
import Event from '../models/event.model'
import axios from 'axios';
import { HttpException } from '../exceptions/HttpException'
import { oauth2Client, profileURL } from '../config/config'
import { duration_in_mins, start_time, end_time } from '../helpers/constants'

export class AuthService {
    private _user = User;
    private _event = Event;

    public async authorize(): Promise<any> {
        try {
            // Access scopes for read/write google user email, profile and calendar activity.
            const scopes = [
                'email', 
                'profile', 
                'https://www.googleapis.com/auth/calendar'
            ];

            // Generate a url that asks permissions for the calendar activity scope
            return oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: scopes,
                prompt: 'consent'
            });
        } catch (error) {
            throw new HttpException(500, 'Something went wrong')
        }
    }

    public async getGoogleUser(code: any): Promise<any> {
        if (!code) {
            throw new HttpException(401, 'You are not authorized to access this endpoint.');
        };

        const googleUser = await this.getGUser(code);
        const { id, email, name } = googleUser.data;

        let user = await this._user.findOne({email})

        let event
        
        if (!user) {
            user = await this._user.create({
                google_id: id,
                name: name,
                email: email,
                refresh_token: googleUser.refresh_token
            })

            event = await this._event.create({
                duration_in_mins: duration_in_mins,
                start_time: start_time,
                end_time: end_time,
                user_id: user._id
            })
        }

        if (!event) event = await this._event.findOne({user_id: user._id})

        return { 
            name: user.name, 
            email: user.email, 
            _id: user._id, 
            duration_in_mins: event?.duration_in_mins,
            available_start_time: event?.start_time,
            available_end_time: event?.end_time
        };
    }

    private async getGUser(code: string): Promise<any> {
        try {
            const { tokens } = await oauth2Client.getToken(code)
            oauth2Client.setCredentials({
                refresh_token: tokens.refresh_token
            });
    
            const googleUser = await axios.get(
                `${profileURL}${tokens.access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${tokens.id_token}`,
                    },
                },
            )

            return { data: googleUser.data, refresh_token: tokens.refresh_token }
        } catch (error) {
            throw new HttpException(400, 'Bad request')
        }
    }
}