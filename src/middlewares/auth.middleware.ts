import { Request, Response, NextFunction } from "express"
import { HttpException } from "../exceptions/HttpException";
import jwt from 'jsonwebtoken';
import { jwt_secret } from "../config/config";
import { jwtDetails } from "../helpers/constants";
import { LoggedInUser } from "../dtos/UserDTO";
import { StatusCodes } from 'http-status-codes';

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    let token;
    const authHeader = req.headers['authorization'];
    if(!authHeader) throw new HttpException(StatusCodes.BAD_REQUEST, 'No Header provided');

    if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7, authHeader.length);
        try {
            const decoded: any = jwt.verify(token, jwt_secret!, 
                {audience: jwtDetails.audience, issuer: jwtDetails.issuer})
            req.user =  new LoggedInUser(decoded.id, decoded.email);
            next();
        } catch (error: any) {
            throw new HttpException(StatusCodes.BAD_REQUEST, error.message);
        }
    } else {
        throw new HttpException(StatusCodes.BAD_REQUEST, 'Invalid Header format');
    }
}