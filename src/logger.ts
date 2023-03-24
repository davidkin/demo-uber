import { format, createLogger, transports } from 'winston';
import requestContext from './asyncStore';

const { combine, timestamp, printf } = format;

const myFormat = printf((info) => {
  const store = requestContext.getStore();
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `${info.timestamp} ${store?.traceId ? `[${store?.traceId}]` : ''} ${info.level}: ${info.message}`;
})

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.File({ level: 'info', filename: 'logs/combined.log' }),
    new transports.File({ level: 'error', filename: 'logs/error.log' }),
    new transports.Console()
  ]
});

export default logger;
