import { IsString, IsOptional, IsNumber, IsPositive } from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateDishDTO:
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
export class UpdateDishDTO {

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  img?: string;

  @IsNumber()
  @IsPositive({ message: 'Price must be a positive number' })
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  category?: string;
}
