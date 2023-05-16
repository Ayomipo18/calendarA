import 'reflect-metadata';
import container from '../di/inversify.config';
import { Router } from 'express';
import CalendarController from '../controllers/calendar.controller';
import validate from '../validators';
import { calendarSchema } from '../validators/calendar.validator';

const calendarController: CalendarController = container.resolve(CalendarController);

const calendarRouter = Router();

calendarRouter.get(
    '/:userId', 
    validate(calendarSchema), 
    calendarController.getCalendar.bind(calendarController)
);

export default calendarRouter