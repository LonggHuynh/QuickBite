// src/controllers/orderController.ts
import { Request, Response, NextFunction } from 'express';
import * as orderSerivce from '../services/OrderService';
import { CreateOrderDTO } from '../dtos/CreateOrderDTO';
import { RateOrderDTO } from '../dtos/RateOrderDTO';
import { AppOrder } from '../models/AppOrder';
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from '../errors/CustomError';

export async function addNewOrderHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
    const uid = req.user?.uid;
    if (!uid) {
        throw new CustomError(401,'Unauthorized');
    }
    const order_id = uuidv4();

    const createOrderDTO: CreateOrderDTO = req.body;
    const order: AppOrder = { ...createOrderDTO, id: order_id, uid, date: new Date(), items: createOrderDTO.items.map(item => ({ ...item, dish_id:item.id, order_id })) };
    const createdOrder = await orderSerivce.createOrder(order);
    res.status(200).json(createdOrder);
}

export async function getOrdersOfUserHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
    const uid = req.user?.uid;
    if (!uid) {
        throw new CustomError(401,'Unauthorized');
    }

    const orders = await orderSerivce.getOrdersOfUser(uid);
    res.status(200).json(orders);
}

export async function rateOrderHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
    const uid = req.user?.uid;
    if (!uid) {
        throw new CustomError(401,'Unauthorized');
    }

    const { id: orderId } = req.params;
    const rateOrderDTO: RateOrderDTO = req.body;
    await orderSerivce.rateOrder(uid, orderId, rateOrderDTO.rating);
    res.status(204);
}
