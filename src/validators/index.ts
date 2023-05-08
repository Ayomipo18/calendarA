import { Request, Response, NextFunction } from "express";
import { z, AnyZodObject } from "zod";
import { HttpException } from "../exceptions/HttpException";

const validate = (schema: AnyZodObject) => 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            });
            return next();
        } catch(error: any) {
            next(new HttpException(400, `${error.issues[0].message}`))
        }
}

export default validate