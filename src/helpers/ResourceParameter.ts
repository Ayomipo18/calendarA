class ResourceParameter {
    public pageNumber: number;
    public pageSize: number;
    public search: string;
    public sort: string;
}

export class MeetingParameter extends ResourceParameter {
    public type: Array<string> | string;
    public inviteeEmail: Array<string> | string;
    public minStart: Date;
    public maxEnd: Date;
}

export class EventParameter extends ResourceParameter {
    public type: Array<string> | string;
}