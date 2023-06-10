import 'reflect-metadata';
import container from '../di/inversify.config';
import { Router } from 'express';
import EventController from '../controllers/event.controller';
import validator from '../validators';
import { isLoggedIn } from '../middlewares/auth.middleware';
import { eventValidator } from '../validators/event.validator';

const eventController: EventController = container.resolve(EventController);

const eventRouter = Router();

eventRouter.post(
    '/',
    isLoggedIn,
    validator.body(eventValidator.createEventSchema),
    eventController.createEvent.bind(eventController)
)

eventRouter.put(
    '/:id',
    isLoggedIn,
    validator.params(eventValidator.idParamsSchema),
    validator.body(eventValidator.createEventSchema),
    eventController.updateEvent.bind(eventController)
)

eventRouter.delete(
    '/:id',
    isLoggedIn,
    validator.params(eventValidator.idParamsSchema),
    eventController.deleteEvent.bind(eventController)
)

eventRouter.get(
    '/:id',
    isLoggedIn,
    validator.params(eventValidator.idParamsSchema),
    eventController.getEvent.bind(eventController)
)

eventRouter.get(
    '/',
    isLoggedIn,
    validator.query(eventValidator.eventResourceSchema),
    eventController.getAllEvents.bind(eventController)
)

export default eventRouter;