import { type Request, type Response } from 'express';
import { NotAuthorizedError } from '../../../../errors';
import { TokenService } from '../../../../services/TokenService';
import config from '../../../../config/config';

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new NotAuthorizedError('Refresh Token wasn\'t provided');
  }

  const user = TokenService.verifyToken(refreshToken, config.refreshToken);

  const accessToken = TokenService.createToken(user);
  const newRefreshToken = TokenService.createRefreshToken(user);

  res.status(200).json({ message: 'Login was success', accessToken, refreshToken: newRefreshToken });
}
