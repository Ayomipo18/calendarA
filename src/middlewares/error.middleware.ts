import { NextFunction, Request, Response } from "express";
import logger from '../logger'
import { ExpressJoiError } from 'express-joi-validation';
import { StatusCodes } from 'http-status-codes';

const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    try {
        if (error && error.error && error.error.isJoi) {
            const e: ExpressJoiError = error
            logger.error(`StatusCode:: ${StatusCodes.BAD_REQUEST}, Message:: ${e.error}`);
            res.status(StatusCodes.BAD_REQUEST).json(`${e.error}, Invalid ${e.type} paramater`)
        }
        else {
            const status: number = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
            const message: string = error.message || 'Internal Server Error';
    
            res.status(status).json({ message });
        }
    } catch(error) {
        next(error);
    }
}

export default errorMiddleware