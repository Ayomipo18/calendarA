import IBookingService from "./ibooking.service";
import IAuthService from "./iauth.service";

export default interface IServiceManager {
    Auth: IAuthService;
    Booking: IBookingService;
}