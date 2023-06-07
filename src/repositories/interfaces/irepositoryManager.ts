import IUserRepository from "./iuser.repository";
import IEventRepository from "./ievent.repository";
import IMeetingRepository from "./imeeting.repository";

export default interface IRepositoryManager {
    User: IUserRepository;
    Event: IEventRepository;
    Meeting: IMeetingRepository;
}