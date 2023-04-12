import express from 'express';
import { SessionControllers } from './index';

const routes = express.Router();

routes.post('/refreshToken', SessionControllers.refreshToken);

export default routes;
