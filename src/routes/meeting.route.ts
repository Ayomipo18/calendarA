import 'reflect-metadata';
import container from '../di/inversify.config';
import { Router } from 'express';
import MeetingController from '../controllers/meeting.controller';
import validator from '../validators';
import { isLoggedIn } from '../middlewares/auth.middleware';
import { meetingValidator } from '../validators/meeting.validator';

const meetingController: MeetingController = container.resolve(MeetingController);

const meetingRouter = Router();

meetingRouter.get(
    '/',
    isLoggedIn,
    validator.query(meetingValidator.meetingResourceSchema),
    meetingController.getAllMeetings.bind(meetingController)
)

export default meetingRouter;