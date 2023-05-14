import ICalendarRepository from "./interfaces/icalendar.repository";
import User from '../models/user.model'
import { Container, injectable, inject } from "inversify";

@injectable()
export default class CalendarRepository implements ICalendarRepository {
    public async findById(id: string): Promise<any> {
        const user = await User.findById(id);
        return user;
    }
}