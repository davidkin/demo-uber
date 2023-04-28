import { SessionRepo } from './session.repo';
import { v4 as uuidv4 } from 'uuid';

class SessionService {
  static async createSession (session: any): Promise<any> {
    const newSession = { sid: uuidv4(), ...session }
    return await SessionRepo.createSession(newSession);
  }

  static async removeSession (sessionId: string): Promise<any> {
    return await SessionRepo.removeSessionById(sessionId);
  }
}

export default SessionService;
