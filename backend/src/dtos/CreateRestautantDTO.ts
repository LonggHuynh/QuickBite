import { IsString, IsOptional, IsNumber, MinLength, IsPositive } from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateRestaurantDTO:
 *       type: object
 *       required:
 *         - name
 *         - delivery_fee
 *         - min_order
 *         - owner_id
 *         - address
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the restaurant
 *         name:
 *           type: string
 *           description: The name of the restaurant
 *           example: "Best Pizza"
 *         owner_id:
 *           type: string
 *           description: The unique identifier of the restaurant owner
 *           example: "owner-1234"
 *         logo_url:
 *           type: string
 *           description: The URL of the restaurant logo
 *           example: "https://example.com/logo.png"
 *         delivery_fee:
 *           type: number
 *           description: The delivery fee of the restaurant
 *           example: 3.99
 *         background_url:
 *           type: string
 *           description: The background image URL of the restaurant
 *           example: "https://example.com/background.png"
 *         min_order:
 *           type: number
 *           description: The minimum order amount of the restaurant
 *           example: 20
 */

export class CreateRestaurantDTO {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name!: string;

  @IsOptional()
  @IsString()
  logo_url?: string;

  @IsNumber()
  @IsPositive({ message: 'Delivery fee must be a positive number' })
  delivery_fee!: number;

  @IsOptional()
  @IsString()
  background_url?: string;

  @IsNumber()
  @IsPositive({ message: 'Minimum order must be a positive number' })
  min_order!: number;

  @IsString()
  owner_id!: string;

  @IsString()
  address!: string;
}
