// src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/AuthService';
import { SignUpDTO } from '../dtos/SignUpDTO';
import { LoginDTO } from '../dtos/LoginDTO';
import { plainToInstance } from 'class-transformer';
import { CustomError } from '../errors/CustomError';



export async function signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
  const signUpDTO = plainToInstance(SignUpDTO, req.body);
  const { email, password } = signUpDTO;
  const user = await authService.signUp(email, password);
  const token = authService.generateToken(user);
  res.status(200).json(user).header('Authorization', `Bearer ${token}`);
}



export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    throw new CustomError(401, 'Missing or invalid Authorization header');
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');

  const [email, password] = credentials.split(':');

  if (!email || !password) {
    res.status(400).json({ message: 'Invalid credentials format' });
    return;
  }

  // Authenticate the user using the provided email and password
  const user = await authService.login(email, password);
  const token = authService.generateToken(user);
  res.status(204).header('Authorization', `Bearer ${token}`).send();

}
