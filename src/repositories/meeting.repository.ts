import IMeetingRepository from "./interfaces/imeeting.repository";
import { Meeting } from "../models/interfaces/imeeting.model";
import { injectable } from "inversify";
import { RepositoryBase } from "./repositoryBase";
import MeetingModel from "../models/meeting.model";

@injectable()
export default class MeetingRepository extends RepositoryBase<Meeting> implements IMeetingRepository {
    constructor(){
        super(MeetingModel);
    }
}