import { compare, hash } from 'bcryptjs';

class EncryptionService {
  static async encryptPassword (password: string): Promise<string> {
    return await hash(password, 12);
  }

  static async comparePassword (password: string, comparePassword: string): Promise<boolean> {
    return await compare(password, comparePassword);
  }
}

export default EncryptionService
