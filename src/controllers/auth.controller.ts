import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
    Tags
} from "tsoa";

import { AuthService } from "../services/auth.service";

@Route('auth/google')
@Tags('Auth')
export default class AuthController extends Controller {
    @Get('/')
    public async authorize(): Promise<any>{
        const authService = new AuthService();
        return await authService.authorize();
    }

    public async getGoogleUser(code: any): Promise<any> {
        const authService = new AuthService();
        const data = await authService.getGoogleUser(code);
        return data;   
    }
}