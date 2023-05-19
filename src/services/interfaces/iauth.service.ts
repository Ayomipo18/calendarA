import SuccessResponse from "../../helpers/SuccessResponse";
import { UserLoginResponse } from "../../dtos/UserDTO";
import { AuthDTO } from "../../dtos/AuthDTO";

export default interface IAuthService {
    authorize(): Promise<SuccessResponse<string>>;
    getGoogleUser(inputCode: AuthDTO): Promise<SuccessResponse<UserLoginResponse>>;
}