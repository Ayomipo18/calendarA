import { Router } from 'express';
import authRouter from './auth.route'
import bookingRouter from './booking.route'
import meetingRouter from './meeting.route'
import userRouter from './user.route'
import eventRouter from './event.route';

const router = Router();

router.use('/auth', authRouter);
router.use('/booking', bookingRouter);
router.use('/meetings', meetingRouter);
router.use('/users', userRouter);
router.use('/events', eventRouter);

export default router;