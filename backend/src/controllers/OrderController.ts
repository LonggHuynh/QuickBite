import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { plainToInstance } from "class-transformer";

import * as orderService from "../services/OrderService";
import { CreateOrderDTO } from "../dtos/CreateOrderDTO";
import { RateOrderDTO } from "../dtos/RateOrderDTO";
import { AppOrder } from "../models/AppOrder";
import { CustomHttpError } from "../errors/CustomHttpError";


/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     description: Endpoint to create a new order for an authenticated user
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderDTO'
 *       401:
 *         description: Unauthorized - user not authenticated
 *       400:
 *         description: Bad request - validation failed
 */
export async function addNewOrderHandler(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const uid = req.user?.uid;
  if (!uid) {
    throw new CustomHttpError(401, "Unauthorized");
  }
  const order_id = uuidv4();

  const createOrderDTO = plainToInstance(CreateOrderDTO, req.body);
  const order: AppOrder = {
    ...createOrderDTO,
    id: order_id,
    uid,
    date: new Date(),
    items: createOrderDTO.items.map((item) => ({
      ...item,
      dish_id: item.id,
      order_id,
    })),
  };
  const createdOrder = await orderService.createOrder(order);
  res.status(200).json(createdOrder);
}

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Retrieve orders of an authenticated user
 *     description: Fetch all orders placed by the authenticated user
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: List of orders successfully retrieved
 *       401:
 *         description: Unauthorized - user not authenticated
 */
export async function getOrdersOfUserHandler(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const uid = req.user?.uid;
  if (!uid) {
    throw new CustomHttpError(401, "Unauthorized");
  }

  const orders = await orderService.getOrdersOfUser(uid);
  res.status(200).json(orders);
}

/**
 * @swagger
 * /orders/{id}/rate:
 *   post:
 *     summary: Rate an order
 *     description: Allows an authenticated user to rate an order
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique ID of the order to be rated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RateOrderDTO'
 *     responses:
 *       204:
 *         description: Order rated successfully
 *       401:
 *         description: Unauthorized - user not authenticated
 *       404:
 *         description: Order not found
 */
export async function rateOrderHandler(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const uid = req.user?.uid;
  if (!uid) {
    throw new CustomHttpError(401, "Unauthorized");
  }

  const { id: orderId } = req.params;
  const rateOrderDTO: RateOrderDTO = req.body;
  await orderService.rateOrder(uid, orderId, rateOrderDTO.rating);
  res.status(204).send();
}
