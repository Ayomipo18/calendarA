import { Meeting } from "../../models/interfaces/imeeting.model";
import IRepository from "./irepositoryBase";

export default interface IUserRepository extends IRepository<Meeting> {}