import { Router, Request, Response, NextFunction } from 'express';
import AuthController from '../controllers/auth.controller';
import successResponse from '../helpers/successResponse'

const authRouter = Router();

authRouter.get('/google', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const authController = new AuthController();
        const googleAuthUrl = await authController.authorize();
        return successResponse(res, 200, 'Paste this link in your browser to authorize CalendarA', googleAuthUrl)
    } catch(error) {
        next(error);
    }
})

authRouter.get('/google/callback', async(req: Request, res: Response, next: NextFunction ) => {
    try {
        const authController = new AuthController();
        const response = await authController.getGoogleUser(req.query.code);
        return successResponse(res, 200, 'Authorization Successful', response)
    } catch(error) {
        next(error);
    }
})

export default authRouter