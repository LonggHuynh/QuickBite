// src/controllers/authController.ts
import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";

import * as authService from "../services/AuthService";
import { SignUpDTO } from "../dtos/SignUpDTO";
import { CustomHttpError } from "../errors/CustomHttpError";

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication and user management
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpDTO'
 *     responses:
 *       201:
 *         description: User successfully registered
 *         headers:
 *           Authorization:
 *             description: JWT token for future requests
 *             schema:
 *               type: string
 *       400:
 *         description: Invalid input data
 */
export async function signUp(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const signUpDTO = plainToInstance(SignUpDTO, req.body);
  const { email, password } = signUpDTO;
  const user = await authService.signUp(email, password);
  const token = authService.generateToken(user);
  res.status(200).json(user).header("Authorization", `Bearer ${token}`);
}

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     basicAuth:
 *       type: http
 *       scheme: basic
 *
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         headers:
 *           Authorization:
 *             description: JWT token for future requests
 *             schema:
 *               type: string
 *       401:
 *         description: Invalid credentials
 */

export async function login(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    throw new CustomHttpError(401, "Missing or invalid Authorization header");
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );

  const [email, password] = credentials.split(":");

  if (!email || !password) {
    throw new CustomHttpError(400, "Invalid credentials format");
  }

  // Authenticate the user using the provided email and password
  const user = await authService.login(email, password);
  const token = authService.generateToken(user);
  res.status(204).header("Authorization", `Bearer ${token}`).send();
}
