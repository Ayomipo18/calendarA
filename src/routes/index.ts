import { Router } from 'express';
import authRouter from './auth.route'
import bookingRouter from './booking.route'
//import meetingRouter from './meeting.route'
import userRouter from './user.route'

const router = Router();

router.use('/auth', authRouter);
router.use('/booking', bookingRouter);
//router.use('/meeting', meetingRouter);
router.use('/user', userRouter);

export default router;