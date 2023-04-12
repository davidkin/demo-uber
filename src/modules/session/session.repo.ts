import { SessionModel } from './index';

class SessionRepo {
  static async createSession (sessionInfo: any): Promise<any> {
    return await SessionModel.create(sessionInfo);
  }

  static async removeSessionById (sessionId: string): Promise<any> {
    return await SessionModel.destroy({ where: { sid: sessionId } });
  }
}

export default SessionRepo;