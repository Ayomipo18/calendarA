import { Router } from 'express';
import authRouter from './auth.route'
import calendarRouter from './calendar.route'
//import meetingRouter from './meeting.route'
import userRouter from './user.route'

const router = Router();

router.use('/v1/auth', authRouter);
router.use('/v1/calendar', calendarRouter);
//router.use('/meeting', meetingRouter);
router.use('/v1/user', userRouter);

export default router;