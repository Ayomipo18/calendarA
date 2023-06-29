import SuccessResponse from "../../helpers/successResponse";
import { UserLoginResponse } from "../../dtos/UserDTO";
import { AuthDTO, AuthUrlResponse, AuthTokenDTO, AuthTokenResponse } from "../../dtos/AuthDTO";

export default interface IAuthService {
    authorize(): Promise<SuccessResponse<AuthUrlResponse>>;
    getGoogleUser(inputCode: AuthDTO): Promise<SuccessResponse<UserLoginResponse>>;
    refreshToken(token: AuthTokenDTO): Promise<SuccessResponse<AuthTokenResponse>>;
}