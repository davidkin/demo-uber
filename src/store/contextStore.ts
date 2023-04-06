import { v4 as uuidv4 } from 'uuid';
import { type IContextData, type IContextService } from '../types';
import { type Logger } from 'winston';

export class ContextService implements IContextService {
  traceId: string;
  logger: Logger;
  store: IContextData;

  constructor (protected config: any, logger: Logger) {
    this.traceId = uuidv4();
    this.logger = logger.child({ traceId: this.traceId })
    this.store = { users: new Map() };
  }

  getUsers (): IContextData['users'] {
    return this.store.users;
  }

  getUser (id: string): any {
    return this.store.users.get(id);
  }

  setUser (user: any): void {
    this.store.users.set(user.id, user);
  }
}
