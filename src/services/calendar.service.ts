import User from '../models/user.model'
import { HttpException } from '../exceptions/HttpException'
import { calendar, getOAuth2Client } from '../config/config'
import moment from 'moment';

export class CalendarService {
    public async getCalendar(user_id: string, date: any ): Promise<any> {
        const user = await User.findById(user_id);

        if (!user) throw new HttpException(404, 'User not found');

        if (!date || date == null) {
            date = new Date()
        } else {
            date = new Date(date)
        }

        const data = await calendar.freebusy.query({
            auth: getOAuth2Client(user.refresh_token),
            requestBody: {
                timeMin: moment(date).startOf('day').format(),
                timeMax: moment(date).endOf('day').format(),
                items: [{
                    id: user.email
                }],
                timeZone: 'GMT+1'
            }
        })

        return data
    }
}