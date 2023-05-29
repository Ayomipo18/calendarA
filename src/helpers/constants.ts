export const event = {
    startTime: '08:00',
    endTime: '17:00',
    durationInMins: 30,
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
    thirtyMins = '30Mins'
}