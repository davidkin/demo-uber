import jwt from 'jsonwebtoken';
import { type IUser } from '../user/type';

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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      process.env.TOKEN_SECRET,
      { expiresIn: '3h' }
    );
  }

  static verifyToken (token: string): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return jwt.verify(token, process.env.TOKEN_SECRET);
  }
}

export default TokenService;
