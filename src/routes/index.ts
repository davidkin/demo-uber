import express from 'express';
import { pingCheck } from '../controllers/ping';

const routes = express.Router();

routes.get('/ping', pingCheck);

export default routes;
