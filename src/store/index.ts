import { RequestContextStorage } from './asyncStore';
import { type IContextService } from '../types';

export const requestContext = new RequestContextStorage<IContextService>();
