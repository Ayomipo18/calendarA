import { injectable } from "inversify";
import lazyInject from "../di/decorators";
import IServiceManager from "./interfaces/iserviceManager";
import IBookingService from "./interfaces/ibooking.service";
import IAuthService from "./interfaces/iauth.service";
import IMeetingService from "./interfaces/imeeting.service";
import IEventService from "./interfaces/ievent.service";
import TYPES from "../di/types";

@injectable()
export default class ServiceManager implements IServiceManager{

    @lazyInject(TYPES.IAuthService)
    private _authService: IAuthService;

    @lazyInject(TYPES.IBookingService)
    private _bookingService: IBookingService;

    @lazyInject(TYPES.IMeetingService)
    private _meetingService: IMeetingService;

    @lazyInject(TYPES.IEventService)
    private _eventService: IEventService;

    public get Auth (): IAuthService {
        return this._authService;
    }

    public get Booking (): IBookingService {
        return this._bookingService;
    }

    public get Meeting (): IMeetingService {
        return this._meetingService;
    }

    public get Event (): IEventService {
        return this._eventService;
    }

}