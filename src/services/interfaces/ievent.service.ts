import { PagedResponse } from "../../helpers/PagedResponse";
import { CreateEventDTO, EventResponse, UpdateEventDTO } from "../../dtos/EventDTO";
import { EventParameter } from "../../helpers/ResourceParameter";
import { LoggedInUser } from "../../dtos/UserDTO";
import SuccessResponse from "../../helpers/SuccessResponse";

export default interface IEventService {
    getAllEvents(eventParameters: EventParameter, loggedInUser: LoggedInUser): Promise<PagedResponse<Array<EventResponse>>>;
    createEvent(createEventDTO: CreateEventDTO, loggedInUser: LoggedInUser): Promise<SuccessResponse<EventResponse>>
    updateEvent(updateEventDTO: UpdateEventDTO, eventId: string, loggedInUser: LoggedInUser): Promise<SuccessResponse<EventResponse>>
    deleteEvent(eventId: string, loggedInUser: LoggedInUser): Promise<SuccessResponse<null>>
    getEvent(eventId: string, loggedInUser: LoggedInUser): Promise<SuccessResponse<EventResponse>>
}