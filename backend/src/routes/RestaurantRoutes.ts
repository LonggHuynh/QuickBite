// src/routes/restaurantRoutes.ts
import { Router } from 'express';

import * as restaurantController from '../controllers/RestaurantController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { asyncHandler } from '../asyncHandler';

const router = Router();
router.get('/', asyncHandler(restaurantController.getRestaurants));
router.get('/:id/dishes', asyncHandler(restaurantController.getDishesByRestaurantId));
router.get('/:id', asyncHandler(restaurantController.getRestaurantById)); 




router.use(authMiddleware);
router.post('/', asyncHandler(restaurantController.createRestaurantHandler)); 
router.put('/:id', asyncHandler(restaurantController.updateRestaurantHandler));


export default router;
