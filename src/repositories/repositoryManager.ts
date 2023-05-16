import { injectable } from "inversify";
import lazyInject from "../di/decorators";
import ICalendarRepository from "./interfaces/icalendar.repository";
import IRepositoryManager from "./interfaces/irepositoryManager";
import TYPES from "../types";

@injectable()
export default class RepositoryManager implements IRepositoryManager{

    @lazyInject(TYPES.ICalendarRepository)
    private _calendarRepository: ICalendarRepository;
    // private _calendarRepository: ICalendarRepository;

    // constructor(@inject(TYPES.ICalendaryRepository) calendarRepository: ICalendarRepository) {
    //     this._calendarRepository = calendarRepository
    // }

    //public calendar: ICalendarRepository = this._calendarRepository;

    public get Calendar (): ICalendarRepository {
        return this._calendarRepository;
    }

}