import { v4 as uuidv4 } from 'uuid';
import { type IContextService } from '../types';
import { type Logger } from 'winston';

export class ContextService implements IContextService {
  traceId: string;
  logger: Logger;
  user: any;

  constructor (protected config: any, logger: Logger) {
    this.traceId = uuidv4();
    this.logger = logger.child({ traceId: this.traceId })
  }

  getUser (): any {
    return this.user;
  }

  setUser (user: any): void {
    this.user = user;
  }
}
