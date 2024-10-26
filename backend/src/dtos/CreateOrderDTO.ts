import { IsString, IsOptional, IsNumber, IsPositive, IsEmail, MinLength, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItemDTO:
 *       type: object
 *       required:
 *         - id
 *         - quantity
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the cart item
 *           example: "item-1234"
 *         quantity:
 *           type: number
 *           description: The quantity of the item
 *           example: 2
 *     CreateOrderDTO:
 *       type: object
 *       required:
 *         - amount_paid
 *         - items
 *         - restaurant_id
 *         - name
 *         - address
 *         - city
 *       properties:
 *         amount_paid:
 *           type: number
 *           description: The total amount paid for the order
 *           example: 49.99
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItemDTO'
 *         restaurant_id:
 *           type: string
 *           description: The unique identifier of the restaurant
 *           example: "restaurant-5678"
 *         name:
 *           type: string
 *           description: The name of the person placing the order
 *           example: "John Doe"
 *         email:
 *           type: string
 *           description: The email of the person placing the order
 *           example: "johndoe@example.com"
 *         address:
 *           type: string
 *           description: The delivery address for the order
 *           example: "123 Pizza Street"
 *         city:
 *           type: string
 *           description: The city for delivery
 *           example: "New York"
 *         postcode:
 *           type: string
 *           description: The postal code for the delivery address
 *           example: "10001"
 */

export class CartItemDTO {
  @IsString()
  id!: string;

  @IsNumber()
  @IsPositive({ message: 'Quantity must be a positive number' })
  quantity!: number;
}

export class CreateOrderDTO {
  @IsNumber()
  @IsPositive({ message: 'Amount paid must be a positive number' })
  amount_paid!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemDTO)
  items!: CartItemDTO[];

  @IsString()
  restaurant_id!: string;

  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name!: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email?: string;

  @IsString()
  address!: string;

  @IsString()
  city!: string;

  @IsOptional()
  @IsString()
  postcode?: string;
}
