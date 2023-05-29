import { NextFunction, Request, Response } from "express";
import logger from '../logger'
import { ExpressJoiError } from 'express-joi-validation';

const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    try {
        if (error && error.error && error.error.isJoi) {
            const e: ExpressJoiError = error
            logger.error(`StatusCode:: ${400}, Message:: ${e.error}`);
            res.status(400).json(`${e.error}, Invalid ${e.type} paramater`)
        }
        else {
            const status: number = error.status || 500;
            const message: string = error.message || 'Internal Server Error';
    
            logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
            res.status(status).json({ message });
        }
    } catch(error) {
        next(error);
    }
}

export default errorMiddleware