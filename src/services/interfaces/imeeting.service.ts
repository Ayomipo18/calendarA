import SuccessResponse from "../../helpers/SuccessResponse";
import { MeetingResponse } from "../../dtos/MeetingDTO";

export default interface IMeetingService {
    getAllMeetings(): Promise<SuccessResponse<Array<MeetingResponse>>>;
}