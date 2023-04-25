export interface IContextService {
  traceId: string;
  readonly logger: any;
  setUser: (user: any) => void;
  getUser: () => any;
}
