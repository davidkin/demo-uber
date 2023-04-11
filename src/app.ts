import express, { type Express, type Request, type Response, type NextFunction } from 'express';
import httpLog from './middleware/http-middleware';
import appRoutes from './modules/routes';
import cors from './middleware/cors-middleware';
import { RequestContextStorage } from './store/asyncStore';
import config from './config/config';
import { ContextService } from './store/contextStore';
import logger from './logger';

const app: Express = express();
const requestContext = new RequestContextStorage();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => { requestContext.initStore(new ContextService(config, logger), next); });

app.use(cors);
app.use(httpLog);

app.use('/', appRoutes);

// Error-handling
app.use((err: { message: string; status: number; }, req: Request, res: Response, next: NextFunction) => {
  const { message, status } = err;
  return res.status(status ?? 500).json({ error: message });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).send('Can\'t find the route')
});

export default app;
