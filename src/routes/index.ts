import { Router } from 'express';
//import authRouter from './auth.route'
import calendarRouter from './calendar.route'
//import meetingRouter from './meeting.route'
import userRouter from './user.route'

const router = Router();

//router.use('/auth', authRouter);
router.use('/calendar', calendarRouter);
//router.use('/meeting', meetingRouter);
router.use('/user', userRouter);

export default router;