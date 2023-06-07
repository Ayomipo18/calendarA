import 'dotenv/config';
import { google } from 'googleapis';
import { LoggedInUser } from '../dtos/UserDTO';

export const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

export const getOAuth2Client = (refresh_token: string) => { 
    oauth2Client.setCredentials({refresh_token})
    return oauth2Client
}

export const googleApi = google;

export const calendar = google.calendar('v3');

export const profileURL = process.env.PROFILE_URL;

export const swagger_url = process.env.SWAGGER_URL;

export const jwt_secret = process.env.JWT_SECRET;

declare module 'express-serve-static-core' {
    interface Request {
        user: LoggedInUser;
    }
}
