import express, { type Express, type Request, type Response } from 'express';
import dotenv from 'dotenv';

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
  res.send('Express and TypeScript Server');
});

// Error-handling
app.use((err: { message: string, status: string }, req: any, res: any, next: any) => {
  const { message, status } = err;
  return res.status(status ?? 500).json({ error: message });
});

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// Graceful Shutdown. Signal to kill all process and to cause program termination
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');

  console.log('Closing http server...');

  server.close(() => {
    console.log('Http server closed.');
    process.exit(0); // Kill all EventLoop processes. Argument 0 means exit with a "success" code. The "failure" code is 1
  });
});
