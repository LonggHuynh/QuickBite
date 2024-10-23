// src/routes/restaurantRoutes.ts
import { Router } from 'express';
import * as restaurantController from '../controllers/RestaurantController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();
router.get('/', restaurantController.getRestaurants);
router.get('/:id/dishes', restaurantController.getDishesByRestaurantId);
router.get('/:id', restaurantController.getRestaurantById); 




router.use(authMiddleware);
router.post('/', restaurantController.createRestaurantHandler); 
router.put('/:id', restaurantController.updateRestaurantHandler);


export default router;
