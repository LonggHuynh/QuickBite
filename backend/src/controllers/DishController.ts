// src/controllers/DishController.ts
import { Request, Response, NextFunction } from 'express';
import { CreateDishDTO } from '../dtos/CreateDishDTO';
import { UpdateDishDTO } from '../dtos/UpdateDishDTO';
import { plainToInstance } from 'class-transformer';
import { Dish } from '../models/Dish';
import { v4 as uuidv4 } from 'uuid';
import * as restaurantService from '../services/RestaurantService';
import * as dishService from '../services/DishService';
import { CustomError } from '../errors/CustomError';


export const createDish = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const uid = req.user?.uid!;
        const restaurant = await restaurantService.getRestaurantByOwnerId(uid);
        if (!restaurant) {
            throw new CustomError(404, 'Restaurant not found');
        }


        const createDishDTO = plainToInstance(CreateDishDTO, req.body);

        const dish: Dish = {
            ...createDishDTO,
            id: createDishDTO.id ?? uuidv4(),
            category: createDishDTO.category || 'Others',
            restaurant_id: restaurant.id,
        };
        const createdDish = await dishService.createDish(dish);
        res.status(201).json(createdDish);
};


export const editDish = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const uid = req.user?.uid!;
    const restaurant = await restaurantService.getRestaurantByOwnerId(uid);
    const dishId: string = req.params.id;
    const updateDishDTO = plainToInstance(UpdateDishDTO, req.body);
    const dish: Partial<Dish> = { ...updateDishDTO }
    const updatedDish = await dishService.updateDish(dishId, restaurant.id, dish);
    res.status(200).json(updatedDish);
};

