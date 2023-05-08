import { Router, Request, Response, NextFunction } from 'express';
import CalendarController from '../controllers/calendar.controller';
import successResponse from '../helpers/successResponse'
import validate from '../validators';
import { calendarSchema } from '../validators/calendar.validator';

const calendarRouter = Router();

calendarRouter.get('/:user_id', validate(calendarSchema), async(req: Request, res: Response, next: NextFunction) => {
    try {
        const calendarController = new CalendarController();
        const response = await calendarController.getCalendar(req.params.user_id, req.query.date);
        return successResponse(res, 200, 'Calendar returned Successfully', response)
    } catch(error) {
        next(error);
    }
})

export default calendarRouter