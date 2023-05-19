import ICalendarService from "./icalendar.service";
import IAuthService from "./iauth.service";

export default interface IServiceManager {
    Auth: IAuthService;
    Calendar: ICalendarService;
}