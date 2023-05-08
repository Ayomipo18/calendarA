import { Router, Request, Response, NextFunction } from 'express';
import MeetingController from '../controllers/auth.controller';
import successResponse from '../helpers/successResponse'

const meetingRouter = Router();

meetingRouter.get('/meeting/:user_id', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const meetingController = new MeetingController();
        const googleAuthUrl = await meetingController.authorize();
        return successResponse(res, 200, 'Paste this link in your browser to authorize CalendarA', googleAuthUrl)
    } catch(error) {
        next(error);
    }
})

export default meetingRouter