import { User } from "../../models/interfaces/iuser.model";
import IRepository from "./irepositoryBase";

export default interface IUserRepository extends IRepository<User> {}