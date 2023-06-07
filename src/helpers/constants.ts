export const event = {
    startTime: '08:00',
    endTime: '17:00',
    durationInMins: 30,
    maxDurationInMins: 6*60,
    inBetweenBreak: 10,
    summary: '30 Minute Meeting',
    description: '30 Minute Meeting',
    slug: '30min'
};

export enum TimeStatus {
    available = 'available', 
    unavailable = 'unavailable' 
};

export enum EventType {
    standardEvent = 'StandardEvent',
    groupEvent = 'GroupEvent',
    collectiveEvent = 'CollectiveEvent',
    roundRobinEvent = 'RoundRobinEvent'
}

export const jwtDetails = {
    expiresIn: 60 * 30,
    issuer: 'CalendarA',
    audience: '*'
}

export const resourceParameter = {
    pageSize: 10,
    pageNumber: 1
}