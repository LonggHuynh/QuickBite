import { IsNumber, IsPositive, Max, Min } from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     RateOrderDTO:
 *       type: object
 *       required:
 *         - rating
 *       properties:
 *         rating:
 *           type: number
 *           description: The rating given for the order, between 1 and 5
 *           example: 4
 */

export class RateOrderDTO {
  @IsNumber()
  @IsPositive({ message: 'Rating must be a positive number' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating cannot be more than 5' })
  rating!: number;
}
