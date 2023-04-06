export interface IContextData {
  users: Map<string, any>;
}

export interface IContextService {
  traceId: string;
  readonly logger: any;
  setUser: (user: any) => void;
  getUser: (id: string) => any;
  getUsers: () => IContextData['users'];
}
