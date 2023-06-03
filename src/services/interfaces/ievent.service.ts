import SuccessResponse from "../../helpers/SuccessResponse";
import { EventResponse } from "../../dtos/EventDTO";

export default interface IEventService {
    getAllEvents(): Promise<SuccessResponse<Array<EventResponse>>>;
}