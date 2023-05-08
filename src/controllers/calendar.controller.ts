import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    Tags
} from "tsoa";

import { CalendarService } from "../services/calendar.service";

@Route('calendar')
@Tags("Calendar")
export default class AuthController extends Controller {
    @Get('{userId}')
    public async getCalendar(@Path() userId: string, @Query() date?: any): Promise<any>{
        const calendarService = new CalendarService();
        return await calendarService.getCalendar(userId, date);
    }
}