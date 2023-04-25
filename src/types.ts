import type * as Joi from 'joi';

export interface IContextService {
  traceId: string;
  readonly logger: any;
  setUser: (user: any) => void;
  getUser: () => any;
}

export interface IValidationError {
  error: Joi.ValidationResult<any>;
  message: string;
}
