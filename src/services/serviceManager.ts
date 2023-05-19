import { injectable } from "inversify";
import lazyInject from "../di/decorators";
import IServiceManager from "./interfaces/iserviceManager";
import ICalendarService from "./interfaces/icalendar.service";
import IAuthService from "./interfaces/iauth.service";
import TYPES from "../types";

@injectable()
export default class ServiceManager implements IServiceManager{

    @lazyInject(TYPES.IAuthService)
    private _authService: IAuthService;

    @lazyInject(TYPES.ICalendarService)
    private _calendarService: ICalendarService;

    public get Auth (): IAuthService {
        return this._authService;
    }

    public get Calendar (): ICalendarService {
        return this._calendarService;
    }

}