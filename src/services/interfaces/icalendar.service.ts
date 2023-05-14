import { GetCalendarDTO } from "../../dtos/CalendarDTO";
import SuccessResponse from "../../helpers/SuccessResponse";

export default interface ICalendarService {
    getCalendar(user_id: string, inputDate: GetCalendarDTO): Promise<SuccessResponse<any>>
}