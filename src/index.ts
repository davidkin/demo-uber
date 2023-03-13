import express, { type Express, type Request, type Response, type NextFunction } from 'express';
import logger from './logger';
import httpLog from './middleware/http-middleware';
import defaultRoutes from './routes'
import cors from './middleware/cors-middleware';

const app: Express = express();
const port = process.env.PORT ?? '8080';

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

const server = app.listen(port, () => {
  logger.info(`️[server]: Server is running at http://localhost:${port}`);
});

// Graceful Shutdown. Signal to kill all process and to cause program termination
// SIGINT add
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');
  logger.info('Closing http server...');

  server.close(() => {
    logger.info('Http server closed.');
    process.exit(0); // Kill all EventLoop processes. Argument 0 means exit with a "success" code. The "failure" code is 1
  });
});
