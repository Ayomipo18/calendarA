import { 
    GetBookingDTO, 
    AddInviteeDTO,
    GetBookingResponse,
} from "../../dtos/BookingDTO";
import { MeetingResponse } from "../../dtos/MeetingDTO";
import SuccessResponse from "../../helpers/SuccessResponse";

export default interface IBookingService {
    getAvailability(eventId: string, inputDate: GetBookingDTO): Promise<SuccessResponse<GetBookingResponse>>
    addInvitee(eventId: string, addUser: AddInviteeDTO): Promise<SuccessResponse<MeetingResponse>>
}