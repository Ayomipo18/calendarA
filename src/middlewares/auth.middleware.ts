import { Request, Response, NextFunction } from "express"
import { HttpException } from "../exceptions/HttpException";
import jwt from 'jsonwebtoken';
import { jwt_secret } from "../config/config";
import { jwtDetails } from "../helpers/constants";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    let token;
    const authHeader = req.headers['authorization'];
    if(!authHeader) throw new HttpException(400, 'No Header provided');

    if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7, authHeader.length);
        try {
            const decoded: any = jwt.verify(token, jwt_secret!, 
                {audience: jwtDetails.audience, issuer: jwtDetails.issuer})
            req.user = {"id": decoded.id, "email": decoded.email}
            next();
        } catch (error: any) {
            throw new HttpException(400, error.message);
        }
    } else {
        throw new HttpException(400, 'Invalid Header format');
    }
}