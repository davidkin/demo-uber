import { AsyncLocalStorage } from 'async_hooks';
import { type NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export type AppStorage = Record<string, any>;

const asyncLocalStorage = new AsyncLocalStorage<AppStorage>();

export class RequestContext<RequestStorage> {
  public asyncStorage: AsyncLocalStorage<RequestStorage>;

  constructor (asyncStorage: AsyncLocalStorage<RequestStorage>) {
    this.asyncStorage = asyncStorage;
  }

  public initStore<AdditionalStoreParams>(store: AdditionalStoreParams & RequestStorage & { traceId?: string; }, next?: NextFunction): void {
    store.traceId = uuidv4();
    this.asyncStorage.run(store, () => {
      if (next) {
        next();
      }
    })
  }

  public addToStore (data: any): void {
    this.asyncStorage.enterWith(data);
  }

  public getStore (): any {
    return this.asyncStorage.getStore();
  }

  public disableStore (): void {
    this.asyncStorage.disable();
  }
}

export default new RequestContext<AppStorage>(asyncLocalStorage);
