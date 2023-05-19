import IEventRepository from "./interfaces/ievent.repository";
import { Event } from "../models/interfaces/ievent.model";
import EventModel from "../models/event.model";
import { injectable } from "inversify";
import { RepositoryBase } from "./repositoryBase";

@injectable()
export default class EventRepository extends RepositoryBase<Event> implements IEventRepository {
    constructor(){
        super(EventModel);
    }
}