import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
/**
 * @swagger
 * components:
 *   schemas:
 *     SignUpDTO:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email
 *         password:
 *           type: string
 *           minLength: 6
 *           description: The user's password, at least 6 characters
 */
export class SignUpDTO {
  @IsEmail()
  @IsNotEmpty()
  email!: string;
  
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;
}
