import jwt from 'jsonwebtoken';
import { type IUser } from '../modules/user/type';
import config from '../config/config';

export class TokenService {
  static createToken (user: IUser): string {
    return jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        status: user.status,
        email: user.email
      },
      config.token,
      { expiresIn: config.tokenExpires }
    );
  }

  static createRefreshToken (user: IUser): string {
    return jwt.sign({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      status: user.status,
      email: user.email
    },
    config.refreshToken,
    { expiresIn: config.refreshTokenExpires })
  }

  static verifyToken (token: string, secret: string, verifyCallback?: (err: any, decode: any) => void): any {
    const tokenSecret = secret || config.token;
    return jwt.verify(token, tokenSecret, verifyCallback);
  }
}
