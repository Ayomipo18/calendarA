// import { AuthService } from "../services/auth.service";
// import { Request, Response, NextFunction } from 'express';
// import successResponse from '../helpers/successResponse'

// export default class AuthController {
//     private _authService = new AuthService();

//     public async authorize(req: Request, res: Response, next: NextFunction): Promise<any>{
//         try {
//             const googleAuthUrl = await this._authService.authorize();
//             return successResponse(res, 200, 'Paste this link in your browser to authorize CalendarA', googleAuthUrl)
//         } catch(error) {
//             next(error);
//         }
//     }

//     public async getGoogleUser(req: Request, res: Response, next: NextFunction): Promise<any> {
//         try {
//             const data = await this._authService.getGoogleUser(req.query.code);
//             return successResponse(res, 200, 'Authorization Successful', data);
//         }catch (error) {
//             next(error);
//         }
//     }
// }