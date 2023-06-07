import 'reflect-metadata';
import container from '../di/inversify.config';
import { Router } from 'express';
import BookingController from '../controllers/booking.controller';
import validator from '../validators';
import { bookingValidator } from '../validators/booking.validator';
import { eventValidator } from '../validators/event.validator';

const bookingController: BookingController = container.resolve(BookingController);

const bookingRouter = Router();

bookingRouter.get(
    '/event/:eventId',
    validator.params(eventValidator.eventIdParamsSchema),
    validator.query(bookingValidator.getAvailabilitySchema),
    bookingController.getAvailability.bind(bookingController)
);

bookingRouter.post(
    '/event/:eventId', 
    validator.params(eventValidator.eventIdParamsSchema),
    validator.body(bookingValidator.addInviteeSchema), 
    bookingController.addInvitee.bind(bookingController)
);

export default bookingRouter