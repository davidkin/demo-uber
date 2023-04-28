import express from 'express';
import * as UserModule from './user';
import * as LiveOpsModule from './liveops';
import * as SessionRoutes from './session';

const routes = express.Router();
const apiV1 = express.Router();

UserModule.initRoutes(apiV1);
LiveOpsModule.initRoutes(apiV1);
SessionRoutes.initRoutes(apiV1);

routes.use('/api/v1', apiV1);

export default routes;
