import container from "./container";
import TYPES from "../types";

import IRepositoryManager from "../repositories/interfaces/irepositoryManager";
import ICalendarRepository from "../repositories/interfaces/icalendar.repository";
import ICalendarService from "../services/interfaces/icalendar.service";
import IServiceManager from "../services/interfaces/iserviceManager";

import RepositoryManager from "../repositories/repositoryManager";
import CalendarRepository from "../repositories/calendar.repository";
import CalendarService from "../services/calendar.service";
import ServiceManager from "../services/serviceManager";

import CalendarController from "../controllers/calendar.controller";

container.bind<ICalendarRepository>(TYPES.ICalendarRepository).to(CalendarRepository);
container.bind<IRepositoryManager>(TYPES.IRepositoryManager).to(RepositoryManager);

container.bind<ICalendarService>(TYPES.ICalendarService).to(CalendarService);
container.bind<IServiceManager>(TYPES.IServiceManager).to(ServiceManager);

export default container;