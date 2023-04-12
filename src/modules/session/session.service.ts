import { SessionRepo } from './index';

class SessionService {
  static async createSession (session: any): Promise<any> {
    return await SessionRepo.createSession(session);
  }

  static async removeSession (sessionId: string): Promise<any> {
    return await SessionRepo.removeSessionById(sessionId);
  }
}

export default SessionService;
