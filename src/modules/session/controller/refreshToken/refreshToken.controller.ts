import { type Request, type Response } from 'express';
import { AuthorizedError, ValidationError } from '../../../../errors';
import { TokenService } from '../../../../services/TokenService';
import config from '../../../../config/config';
import { refreshTokenValidation } from './refreshToken.validation';

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  const { error, message } = refreshTokenValidation(req.body);

  if (error) {
    throw new ValidationError(message);
  }

  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AuthorizedError('Refresh Token wasn\'t provided');
  }

  const user = TokenService.verifyToken(refreshToken, config.refreshToken);

  const accessToken = TokenService.createToken(user);
  const newRefreshToken = TokenService.createRefreshToken(user);

  res.status(200).json({ message: 'Login was success', accessToken, refreshToken: newRefreshToken });
}
