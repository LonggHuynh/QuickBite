import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { v4 as uuidv4 } from "uuid";

import { CreateDishDTO } from "../dtos/CreateDishDTO";
import { UpdateDishDTO } from "../dtos/UpdateDishDTO";
import { Dish } from "../models/Dish";
import * as restaurantService from "../services/RestaurantService";
import * as dishService from "../services/DishService";

/**
 * @swagger
 * tags:
 *   name: Dishes
 *   description: Dish management
 */

export const createDish = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const uid = req.user?.uid!;
  const createDishDTO = plainToInstance(CreateDishDTO, req.body);
  const dish: Dish = {
    ...createDishDTO,
    id: createDishDTO.id ?? uuidv4(),
    category: createDishDTO.category || "Others",
  };
  const createdDish = await dishService.createDish(dish, uid);
  res.status(201).json(createdDish);
};

/**
 * @swagger
 * /api/dishes/{id}:
 *   put:
 *     summary: Edit an existing dish
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The dish id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDishDTO'
 *     responses:
 *       200:
 *         description: Dish successfully updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Dish not found
 *       400:
 *         description: Validation error
 */
export const editDish = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const uid = req.user?.uid!;
  const restaurant = await restaurantService.getRestaurantByOwnerId(uid);
  const dishId: string = req.params.id;
  const updateDishDTO = plainToInstance(UpdateDishDTO, req.body);
  const dish: Partial<Dish> = { ...updateDishDTO };
  const updatedDish = await dishService.updateDish(dishId, restaurant.id, dish);
  res.status(200).json(updatedDish);
};
