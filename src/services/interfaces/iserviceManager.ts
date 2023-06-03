import IBookingService from "./ibooking.service";
import IAuthService from "./iauth.service";
import IMeetingService from "./imeeting.service";
import IEventService from "./ievent.service";

export default interface IServiceManager {
    Auth: IAuthService;
    Booking: IBookingService;
    Meeting: IMeetingService;
    Event: IEventService;
}