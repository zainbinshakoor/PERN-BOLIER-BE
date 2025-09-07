import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  const message = `Route ${req.originalUrl} not found`;
  next(new AppError(message, 404));
};