import IRepositoryManager from '../repositories/interfaces/irepositoryManager';
import IAuthService from './interfaces/iauth.service';
import axios from 'axios';
import { injectable, inject } from "inversify";
import TYPES from '../types';
import SuccessResponse from '../helpers/SuccessResponse';
import logger from "../logger";
import { HttpException } from '../exceptions/HttpException'
import { oauth2Client, profileURL } from '../config/config'
import { durationInMins, startTime, endTime } from '../helpers/constants'
import { GetGoogleUser, UserLoginResponse } from '../dtos/UserDTO';
import { mapper } from '../mappings/mapper';
import { User } from '../models/interfaces/iuser.model';
import { AuthDTO } from '../dtos/AuthDTO';

@injectable()
export default class AuthService implements IAuthService {
    private _repository;

    constructor(@inject(TYPES.IRepositoryManager) repository: IRepositoryManager) {
        this._repository = repository;
    }

    public async authorize(): Promise<SuccessResponse<string>> {
        try {
            // Access scopes for read/write google user email, profile and calendar activity.
            const scopes = [
                'email', 
                'profile', 
                'https://www.googleapis.com/auth/calendar'
            ];

            // Generate a url that asks permissions for the calendar activity scope
            const url = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: scopes,
                prompt: 'consent'
            });

            return new SuccessResponse<string>(200, "Paste this link in your browser to authorize CalendarA", url)
        } catch (error) {
            throw new HttpException(500, 'Something went wrong')
        }
    }

    public async getGoogleUser(inputCode: AuthDTO): Promise<SuccessResponse<UserLoginResponse>> {
        if (!inputCode) throw new HttpException(401, 'You are not authorized to access this endpoint.');

        const googleUser = await this.getGUser(inputCode.code!);
        const { id, email, name } = googleUser.data;

        let user = await this._repository.User.findOne({email})

        let event;
        
        if (!user) {
            user = await this._repository.User.create({
                googleId: id,
                name: name,
                email: email,
                refreshToken: googleUser.refreshToken
            })

            event = await this._repository.Event.create({
                durationInMins: durationInMins,
                startTime: startTime,
                endTime: endTime,
                userId: user._id
            })
        }

        if (!event) event = await this._repository.Event.findOne({userId: user._id})

        const userLoginResponseDto = mapper.map(user, User, UserLoginResponse);

        return new SuccessResponse<UserLoginResponse>(200, 'Google Authorization completed', userLoginResponseDto)
    }

    private async getGUser(code: string): Promise<GetGoogleUser> {
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

            return { data: googleUser.data, refreshToken: tokens.refresh_token }
        } catch (error) {
            logger.error(`Error from Getting User email and profile:: ${error}`);
            throw new HttpException(400, 'Bad request')
        }
    }
}