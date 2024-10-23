import { Router } from 'express';
import * as orderController from '../controllers/OrderController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();


router.use(authMiddleware);

router.get('/', orderController.getOrdersOfUserHandler);
router.post('/', orderController.addNewOrderHandler);







export default router;
