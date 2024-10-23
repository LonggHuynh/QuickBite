import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUUID, IsPositive } from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateDishDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Optional UUID for the dish. If not provided, it will be generated automatically.
 *         name:
 *           type: string
 *           description: Name of the dish.
 *         description:
 *           type: string
 *           description: Description of the dish.
 *         img:
 *           type: string
 *           format: uri
 *           description: URL of the dish image.
 *         price:
 *           type: number
 *           description: Price of the dish. Must be a positive number.
 *         category:
 *           type: string
 *           description: Category of the dish (e.g., Appetizer, Main Course).
 *         restaurant_id:
 *           type: string
 *           format: uuid
 *           description: UUID of the restaurant the dish belongs to.
 *       required:
 *         - name
 *         - description
 *         - price
 *         - restaurant_id
 */
export class CreateDishDTO {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsOptional()
  @IsString()
  img?: string;

  @IsNumber()
  @IsPositive({ message: 'Price must be a positive number' })
  price!: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsUUID()
  @IsNotEmpty({ message: 'Restaurant ID is required' })
  restaurant_id!: string;
}
