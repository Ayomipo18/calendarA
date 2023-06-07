import { PagedResponse } from "../../helpers/PagedResponse";
import { MeetingResponse } from "../../dtos/MeetingDTO";
import { MeetingParameter } from "../../helpers/ResourceParameter";
import { LoggedInUser } from "../../dtos/UserDTO";

export default interface IMeetingService {
    getAllMeetings(meetingParameters: MeetingParameter, loggedInUser: LoggedInUser): Promise<PagedResponse<Array<MeetingResponse>>>;
}