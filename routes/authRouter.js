import { Router } from 'express';

import {
    registerController,
    loginController,
    currentController,
    logoutController,
    changeAvatarController,
} from '../controllers/authControllers.js';
import { changeSubscriptionController } from '../controllers/userController.js';
import validateBody from '../helpers/validateBody.js';
import { authLoginSchema, authRegisterSchema } from '../schemas/authSchemas.js';
import { subscriptionUpdateSchema } from '../schemas/usersSchemas.js';
import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';

const authRouter = new Router();

authRouter.post('/register', validateBody(authRegisterSchema), registerController);

authRouter.post('/login', validateBody(authLoginSchema), loginController);

authRouter.get('/current', authenticate, currentController);

authRouter.post('/logout', authenticate, logoutController);

authRouter.patch('/subscription', authenticate, validateBody(subscriptionUpdateSchema), changeSubscriptionController);

authRouter.patch('/avatars', upload.single('avatar'), authenticate, changeAvatarController);

export default authRouter;
