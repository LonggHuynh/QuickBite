// src/routes/dishRoutes.ts
import { Router } from 'express';
import { dishController } from '../controllers/DishController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

router.use(authMiddleware);



/**
 * @swagger
 * tags:
 *   name: Dishes
 *   description: Dish management
 */





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
router.put('/:id', dishController.editDish);


export default router;
