import IRepositoryManager from '../repositories/interfaces/irepositoryManager';
import IAuthService from './interfaces/iauth.service';
import axios from 'axios';
import { injectable, inject } from "inversify";
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid'
import TYPES from '../types';
import SuccessResponse from '../helpers/SuccessResponse';
import logger from "../logger";
import { HttpException } from '../exceptions/HttpException'
import { oauth2Client, profileURL, jwt_secret } from '../config/config'
import { 
    event, 
    EventType,
    jwtDetails
 } from '../helpers/constants'
import { GetGoogleUser, UserLoginResponse } from '../dtos/UserDTO';
import { mapper } from '../mappings/mapper';
import { User } from '../models/interfaces/iuser.model';
import { AuthDTO, AuthTokenDTO, AuthTokenResponse } from '../dtos/AuthDTO';

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
        
        if (!user) {
            user = await this._repository.User.create({
                googleId: id,
                name: name,
                email: email,
                googleRefreshToken: googleUser.refreshToken
            })

            await this._repository.Event.create({
                durationInMins: event.durationInMins,
                startTime: event.startTime,
                endTime: event.endTime,
                user: user._id,
                eventType: EventType.thirtyMins,
                summary: event.summary,
                description: event.description,
                slug: event.slug
            })
        }
        
        const token = await this.generateToken(user, true);
        const userLoginResponseDto = mapper.map(user, User, UserLoginResponse);

        userLoginResponseDto.refreshToken = token.refreshToken;
        userLoginResponseDto.accessToken = token.accessToken;

        return new SuccessResponse<UserLoginResponse>(200, 'Google Authorization completed', userLoginResponseDto)
    }

    public async refreshToken(token: AuthTokenDTO): Promise<SuccessResponse<AuthTokenResponse>> {
        let newToken : AuthTokenResponse = new AuthTokenResponse();
        try {
            jwt.verify(token.accessToken, jwt_secret!, 
                {audience: jwtDetails.audience, issuer: jwtDetails.issuer})
        } catch (error: any) {
            if (error.name === 'TokenExpiredError') {
                const decoded: any = jwt.verify(token.accessToken, jwt_secret!, 
                    {audience: jwtDetails.audience, issuer: jwtDetails.issuer, ignoreExpiration: true})

                const user = await this._repository.User.findById(decoded.id);
                if(!user || token.refreshToken !== user.refreshToken || user.refreshTokenExpiryTime < new Date() ) {
                    throw new HttpException(400, 'Bad token')
                }
                
                newToken = await this.generateToken(user, false);
            } else{
                throw new HttpException(400, 'This token has expired, please login')
            }
        }
        return new SuccessResponse<AuthTokenResponse>(200, 'Token refreshed successfully', newToken);
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

    private async generateToken(user: User, populate: boolean) {
        const tokenDetails = {
            id: user.id,
            email: user.email
        }
        const accessToken = jwt.sign(tokenDetails, jwt_secret!, jwtDetails);
        const refreshToken = nanoid();

        user.refreshToken = refreshToken;
        if(populate) {
            user.refreshTokenExpiryTime = new Date();
            user.refreshTokenExpiryTime.setDate(user.refreshTokenExpiryTime.getDate() + 7);
        }

        await user.save();

        const token = new AuthTokenResponse();
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;

        return token;
    }
}