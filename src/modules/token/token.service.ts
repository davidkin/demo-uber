import jwt, { type JwtPayload } from 'jsonwebtoken';
import { type IUser } from '../user/type';
import config from '../../config/config';

class TokenService {
  static createToken (user: IUser): string {
    return jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email
      },
      config.token,
      { expiresIn: '3h' }
    );
  }

  static refreshToken (user: IUser): string {
    return jwt.sign({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      email: user.email
    },
    config.refreshToken,
    { expiresIn: '5h' })
  }

  static verifyToken (token: string, secret: string, verifyCallback?: (err: any, decode: any) => void): any {
    const tokenSecret = secret || config.token;
    return jwt.verify(token, tokenSecret, verifyCallback);
  }
}

export default TokenService;
