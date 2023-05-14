export default interface ICalendarRepository {
    findById(id: string): Promise<any>
}