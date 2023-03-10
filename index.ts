import express, { type Express, type Request, type Response, type NextFunction } from 'express';
import dotenv from 'dotenv';
import logger from './logger';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? '8080';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Express and TypeScript Server' });
});

app.use('/ping', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ message: 'Project created!' });
  } catch (err) {
    next(err);
  }
})

// Error-handling
app.use((err: { message: string, status: number }, req: Request, res: Response, next: NextFunction) => {
  const { message, status } = err;
  return res.status(status ?? 500).json({ error: message });
});

const server = app.listen(port, () => {
  logger.info(`️[server]: Server is running at http://localhost:${port}`);
});

// Graceful Shutdown. Signal to kill all process and to cause program termination
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');
  logger.info('Closing http server...');

  server.close(() => {
    logger.info('Http server closed.');
    process.exit(0); // Kill all EventLoop processes. Argument 0 means exit with a "success" code. The "failure" code is 1
  });
});
