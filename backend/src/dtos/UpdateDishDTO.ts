import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUUID, IsPositive } from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateDishDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the dish
 *           example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *         name:
 *           type: string
 *           description: Name of the dish (optional)
 *           example: "Margherita Pizza"
 *         description:
 *           type: string
 *           description: Description of the dish (optional)
 *           example: "Classic Margherita with fresh basil and mozzarella."
 *         img:
 *           type: string
 *           description: URL of the dish image (optional)
 *           example: "https://example.com/dish-image.jpg"
 *         price:
 *           type: number
 *           description: Price of the dish (optional)
 *           example: 9.99
 *         category:
 *           type: string
 *           description: Category of the dish (optional)
 *           example: "Pizza"
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
