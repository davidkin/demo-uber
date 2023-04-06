import { AsyncLocalStorage } from 'async_hooks';
import { type NextFunction } from 'express';

export class RequestContextStorage<RequestStorage> {
  public asyncStorage: AsyncLocalStorage<RequestStorage>;

  constructor () {
    this.asyncStorage = new AsyncLocalStorage();
  }

  public initStore (store: RequestStorage, next?: NextFunction): void {
    this.asyncStorage.run(store, () => {
      if (next) {
        next();
      }
    })
  }

  public getStore (): any {
    return this.asyncStorage.getStore();
  }

  public disableStore (): void {
    this.asyncStorage.disable();
  }
}
