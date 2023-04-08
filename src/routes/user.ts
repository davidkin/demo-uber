import express from 'express';
import { UserController } from '../modules/user';

const routes = express.Router();

routes.post('/login', UserController.login);
routes.post('/signUp', UserController.signUp);

export default routes;
