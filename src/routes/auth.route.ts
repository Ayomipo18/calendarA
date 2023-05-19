import 'reflect-metadata';
import container from '../di/inversify.config';
import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const authController: AuthController = container.resolve(AuthController);

const authRouter = Router();

authRouter.get('/google', authController.authorize.bind(authController));

authRouter.get('/google/callback', authController.getGoogleUser.bind(authController));

export default authRouter;