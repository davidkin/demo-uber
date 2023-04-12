import express from 'express';
import { UserController } from './index';

const routes = express.Router();

routes.post('/login', UserController.login);
routes.post('/signUp', UserController.signUp);
routes.post('/logout', UserController.logout);

export default routes;
