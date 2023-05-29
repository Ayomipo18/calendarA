import container from "./container";
import TYPES from "../types";

import IRepositoryManager from "../repositories/interfaces/irepositoryManager";
import IUserRepository from "../repositories/interfaces/iuser.repository";
import IEventRepository from "../repositories/interfaces/ievent.repository";
import IMeetingRepository from "../repositories/interfaces/imeeting.repository";
import IBookingService from "../services/interfaces/ibooking.service";
import IAuthService from "../services/interfaces/iauth.service";
import IServiceManager from "../services/interfaces/iserviceManager";

import RepositoryManager from "../repositories/repositoryManager";
import UserRepository from "../repositories/user.repository";
import EventRepository from "../repositories/event.repository";
import MeetingRepository from "../repositories/meeting.repository";
import BookingService from "../services/booking.service";
import AuthService from "../services/auth.service";
import ServiceManager from "../services/serviceManager";

container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<IEventRepository>(TYPES.IEventRepository).to(EventRepository);
container.bind<IMeetingRepository>(TYPES.IMeetingRepository).to(MeetingRepository);
container.bind<IRepositoryManager>(TYPES.IRepositoryManager).to(RepositoryManager);

container.bind<IBookingService>(TYPES.IBookingService).to(BookingService);
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<IServiceManager>(TYPES.IServiceManager).to(ServiceManager);

export default container;