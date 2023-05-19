import IUserRepository from "./interfaces/iuser.repository";
import { User } from "../models/interfaces/iuser.model";
import { injectable } from "inversify";
import { RepositoryBase } from "./repositoryBase";
import UserModel from "../models/user.model";

@injectable()
export default class UserRepository extends RepositoryBase<User> implements IUserRepository {
    constructor(){
        super(UserModel);
    }
}