import { Router } from 'express';

import * as orderController from '../controllers/OrderController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { asyncHandler } from '../asyncHandler';

const router = Router();


router.use(authMiddleware);

router.get('/', asyncHandler(orderController.getOrdersOfUserHandler));
router.post('/', asyncHandler(orderController.addNewOrderHandler));







export default router;
