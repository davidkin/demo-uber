import express, { type Express, type Request, type Response, type NextFunction } from 'express';
import httpLog from './middleware/http-middleware';
import defaultRoutes from './routes'
import cors from './middleware/cors-middleware';
import requestContext from './asyncStore';
import config from './config/config';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => { requestContext.initStore({ config }, next); })

// TODO: discuss this moment
// const asyncHook = createHook({
//   init (asyncId, type, triggerAsyncId, resource) {
//     const store = requestContext.getStore();
//     const appContext = store ? { ...store } : { config };
//
//     requestContext.initStore(appContext)
//   },
//   destroy (asyncId) {
//     requestContext.disableStore();
//   }
// });
//
// asyncHook.enable();

app.use(cors);
app.use(httpLog);

app.use('/', defaultRoutes);

// Error-handling
app.use((err: { message: string; status: number; }, req: Request, res: Response, next: NextFunction) => {
  const { message, status } = err;
  return res.status(status ?? 500).json({ error: message });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).send('Can\'t find the route')
});

export default app;