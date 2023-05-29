import { Request, Response, NextFunction } from "express"
import { HttpException } from "../exceptions/HttpException";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (req.userId == null || !req.userId) throw new HttpException(400, 'Please Login');
    next();
}