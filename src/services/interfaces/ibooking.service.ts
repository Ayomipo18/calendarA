import { 
    GetBookingDTO, 
    AddUserDTO,
    GetBookingResponse,
} from "../../dtos/BookingDTO";
import { MeetingResponse } from "../../dtos/MeetingDTO";
import SuccessResponse from "../../helpers/SuccessResponse";

export default interface IBookingService {
    getAvailability(eventId: string, inputDate: GetBookingDTO): Promise<SuccessResponse<GetBookingResponse>>
    addUser(eventId: string, addUser: AddUserDTO): Promise<SuccessResponse<MeetingResponse>>
}