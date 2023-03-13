import express, { type Express, type Request, type Response, type NextFunction } from 'express';
import httpLog from './middleware/http-middleware';
import defaultRoutes from './routes'
import cors from './middleware/cors-middleware';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
