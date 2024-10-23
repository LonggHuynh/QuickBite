// src/controllers/restaurantController.ts
import { Request, Response, NextFunction } from 'express';
import * as restaurantService from '../services/RestaurantService';
import { plainToInstance } from 'class-transformer';
import { Restaurant } from '../models/Restaurant';
import { v4 as uuidv4 } from 'uuid';
import { UpdateRestaurantDTO } from '../dtos/UpdateRestautantDTO';
import { CreateRestaurantDTO } from '../dtos/CreateRestautantDTO';
import * as dishService from '../services/DishService';

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: Restaurant management
 */

/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantDTO'
 *     responses:
 *       201:
 *         description: Restaurant created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
export async function createRestaurantHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
    const ownerId = req.user?.uid!;
    const createRestaurantDTO = plainToInstance(CreateRestaurantDTO, req.body);
    const restaurant: Restaurant = { ...createRestaurantDTO, id: createRestaurantDTO.id ?? uuidv4(), owner_id: ownerId };
    const createdRestaurant = await restaurantService.createRestaurant(ownerId, restaurant);
    res.status(201).json(createdRestaurant);
}

/**
 * @swagger
 * /api/restaurants/{id}:
 *   put:
 *     summary: Update an existing restaurant
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The restaurant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantDTO'
 *     responses:
 *       200:
 *         description: Restaurant updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *       403:
 *         description: Forbidden (You are not the owner)
 *       404:
 *         description: Restaurant not found
 */
export async function updateRestaurantHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
    const restaurantId = req.params.id;
    const updateRestaurantDTO = plainToInstance(UpdateRestaurantDTO, req.body);
    const restaurant: Partial<Restaurant> = { ...updateRestaurantDTO };
    const updatedRestaurant = await restaurantService.updateRestaurant(restaurantId, restaurant);
    res.status(200).json(updatedRestaurant);

}




/**
 * @swagger
 * /api/restaurants/{id}:
 *   get:
 *     summary: Get a restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The restaurant ID
 *     responses:
 *       200:
 *         description: Restaurant details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RestaurantDTO'
 *       404:
 *         description: Restaurant not found
 */
export async function getRestaurantById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const restaurant = await restaurantService.getRestaurantById(req.params.id);
    res.status(200).json(restaurant);
}



/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Get restaurants
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A restaurant owned by the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 */
export async function getRestaurants(req: Request, res: Response, next: NextFunction): Promise<void> {
    const restaurants = await restaurantService.getRestaurants();
    res.status(200).json(restaurants);
}


export const getDishesByRestaurantId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dishes = await dishService.getDishesByRestaurantId(req.params.id);
    res.status(200).json(dishes);
}