import { format, createLogger, transports } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.simple(),
  transports: [
    new transports.File({ level: 'info', filename: 'logs/combined.log' }),
    new transports.File({ level: 'error', filename: 'logs/error.log' }),
    new transports.Console()
  ]
});

export default logger;
