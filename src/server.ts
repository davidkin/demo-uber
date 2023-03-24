import app from './app';
import config from './config/config';
import logger from './logger';

const EXIT_SIGNALS = ['SIGINT', 'SIGTERM'];

const server = app.listen(config.port, () => {
  logger.info(`️[server]: Server is running at http://localhost:${config.port}`);
});

// Graceful Shutdown. Signal to kill all process and to cause program termination
EXIT_SIGNALS.forEach(signal => process.on(signal, () => {
  logger.info(`${signal} signal received.`);
  logger.info('Closing http server...');

  server.close(() => {
    logger.info('Http server closed.');
    process.exit(0); // Kill all EventLoop processes. Argument 0 means exit with a "success" code. The "failure" code is 1
  });
}));