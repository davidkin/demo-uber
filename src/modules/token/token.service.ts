import jwt from 'jsonwebtoken';

class TokenService {
  static createToken (payload: any): string {
    return jwt.sign(
      payload,
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
