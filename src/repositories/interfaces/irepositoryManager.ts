import IUserRepository from "./iuser.repository";
import IEventRepository from "./ievent.repository";

export default interface IRepositoryManager {
    User: IUserRepository;
    Event: IEventRepository;
}