import express from 'express';
import { TokenControllers } from './index';

const routes = express.Router();

routes.post('/refreshToken', TokenControllers.refreshToken);

export default routes;
