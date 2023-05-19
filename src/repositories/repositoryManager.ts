import { injectable } from "inversify";
import lazyInject from "../di/decorators";
import IRepositoryManager from "./interfaces/irepositoryManager";
import IUserRepository from "./interfaces/iuser.repository";
import IEventRepository from "./interfaces/ievent.repository";
import TYPES from "../types";

@injectable()
export default class RepositoryManager implements IRepositoryManager{

    @lazyInject(TYPES.IUserRepository)
    private _userRepository: IUserRepository;

    @lazyInject(TYPES.IEventRepository)
    private _eventRepository: IEventRepository;

    public get User (): IUserRepository {
        return this._userRepository;
    }

    public get Event (): IEventRepository {
        return this._eventRepository;
    }

}