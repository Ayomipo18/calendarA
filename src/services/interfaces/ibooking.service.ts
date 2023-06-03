import { 
    GetBookingDTO, 
    AddUserDTO,
    GetBookingResponse,
} from "../../dtos/BookingDTO";
import { BookingResponse } from "../../dtos/BookingDTO";
import SuccessResponse from "../../helpers/SuccessResponse";

export default interface IBookingService {
    getAvailability(eventId: string, inputDate: GetBookingDTO): Promise<SuccessResponse<GetBookingResponse>>
    addUser(eventId: string, addUser: AddUserDTO): Promise<SuccessResponse<BookingResponse>>
}