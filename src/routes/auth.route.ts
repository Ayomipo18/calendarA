import 'reflect-metadata';
import container from '../di/inversify.config';
import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { authValidator } from '../validators/auth.validator';
import validator from '../validators';

const authController: AuthController = container.resolve(AuthController);

const authRouter = Router();

authRouter.get('/google', authController.authorize.bind(authController));

authRouter.get('/google/callback', authController.getGoogleUser.bind(authController));

authRouter.post('/token/refresh', validator.body(authValidator.refreshTokenSchema) ,authController.refreshToken.bind(authController));

export default authRouter;