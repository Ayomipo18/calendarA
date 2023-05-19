import { Event } from "../../models/interfaces/ievent.model";
import IRepository from "./irepositoryBase";

export default interface IEventRepository extends IRepository<Event> {}