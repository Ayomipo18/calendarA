import SuccessResponse from "../../helpers/SuccessResponse";
import { UserLoginResponse } from "../../dtos/UserDTO";
import { AuthDTO, AuthTokenDTO, AuthTokenResponse } from "../../dtos/AuthDTO";

export default interface IAuthService {
    authorize(): Promise<SuccessResponse<string>>;
    getGoogleUser(inputCode: AuthDTO): Promise<SuccessResponse<UserLoginResponse>>;
    refreshToken(token: AuthTokenDTO): Promise<SuccessResponse<AuthTokenResponse>>;
}