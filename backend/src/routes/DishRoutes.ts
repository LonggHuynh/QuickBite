import { Router } from 'express';

import * as dishController from '../controllers/DishController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

router.use(authMiddleware);
router.put('/:id', dishController.editDish);


export default router;
