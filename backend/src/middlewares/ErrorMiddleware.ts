import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ msg: err.message });
  } else {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};
