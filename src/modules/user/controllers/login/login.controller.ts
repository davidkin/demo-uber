import { type NextFunction, type Request, type Response } from 'express';

const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  res.status(200).json({ message: 'Login was success' });
}

export { loginUser }
