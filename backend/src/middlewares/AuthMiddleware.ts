import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CustomError } from '../errors/CustomError';

dotenv.config();

interface JwtPayload {
  uid: string;
  role: string; 
  iat: number;
  exp: number;
  email: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new CustomError(401, 'No token provided'));
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return next(new CustomError(401, 'Malformed token'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const claims = { uid: decoded.uid, role: decoded.role, email: decoded.email };
    req.user = claims;
    next();
  } catch (err) {
    return next(new CustomError(401, 'Invalid token'));
  }
};
