import { injectable } from "inversify";
import lazyInject from "../di/decorators";
import IServiceManager from "./interfaces/iserviceManager";
import IBookingService from "./interfaces/ibooking.service";
import IAuthService from "./interfaces/iauth.service";
import TYPES from "../types";

@injectable()
export default class ServiceManager implements IServiceManager{

    @lazyInject(TYPES.IAuthService)
    private _authService: IAuthService;

    @lazyInject(TYPES.IBookingService)
    private _bookingService: IBookingService;

    public get Auth (): IAuthService {
        return this._authService;
    }

    public get Booking (): IBookingService {
        return this._bookingService;
    }

}