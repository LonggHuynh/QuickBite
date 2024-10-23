import { IsString, IsOptional, IsNumber, IsUUID, MinLength, IsPositive, IsNotEmpty } from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateRestaurantDTO:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the restaurant.
 *         name:
 *           type: string
 *           description: Name of the restaurant.
 *           minLength: 3
 *         logo_url:
 *           type: string
 *           format: url
 *           description: URL to the restaurant's logo.
 *         delivery_fee:
 *           type: number
 *           description: Delivery fee for the restaurant.
 *           minimum: 0
 *         background_url:
 *           type: string
 *           format: url
 *           description: URL to the restaurant's background image.
 *         min_order:
 *           type: number
 *           description: Minimum order amount required.
 *           minimum: 0
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         name: "The Great Pizza Place"
 *         logo_url: "http://example.com/logo.png"
 *         delivery_fee: 5.99
 *         background_url: "http://example.com/background.png"
 *         min_order: 20
 */
export class UpdateRestaurantDTO {
  @IsUUID()
  @IsNotEmpty({ message: 'Restaurant ID is required for update' })
  id!: string;  

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name?: string;

  @IsOptional()
  @IsString()
  logo_url?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive({ message: 'Delivery fee must be a positive number' })
  delivery_fee?: number;

  @IsOptional()
  @IsString()
  background_url?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive({ message: 'Minimum order must be a positive number' })
  min_order?: number;
}
