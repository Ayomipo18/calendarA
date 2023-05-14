export class GetCalendarDTO {
    public date?: string;
}

export class GetCalendarReponse {
    public freeTimes: Array<any>;
    public busyTimes: Array<any>;
}