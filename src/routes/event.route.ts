import 'reflect-metadata';
import container from '../di/inversify.config';
import { Router } from 'express';
import EventController from '../controllers/event.controller';
import validator from '../validators';
import { isLoggedIn } from '../middlewares/auth.middleware';
//import { meetingValidator } from '../validators/booking.validator';

const eventController: EventController = container.resolve(EventController);

const eventRouter = Router();

eventRouter.get(
    '/',
    isLoggedIn,
    //validate query for pagination and searching and filtering,
    eventController.getAllEvents.bind(eventController)
)

export default eventRouter;