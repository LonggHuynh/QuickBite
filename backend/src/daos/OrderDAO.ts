// src/dao/OrderDAO.ts
import pool from '../config/database';
import { AppOrder } from '../models/AppOrder';
import { Item } from '../models/Item';



export interface FlatOrderRow {
  order_id: string;
  uid: string;
  rating?: number;
  restaurant_id: string;
  date?: Date;
  name: string;
  email?: string;
  address?: string;
  city: string;
  amount_paid: number;
  dish_id: string;
  quantity: number;
  dish_name: string;
  dish_description: string;
  dish_price: number;
  dish_img?: string;
  dish_category?: string;
  restaurant_name: string;
  restaurant_logo_url?: string;
  delivery_fee: number;
  restaurant_background_url?: string;
  min_order: number;
}

export async function getUserOrdersFlat(uid: string): Promise<AppOrder[]> {
  const query = `
    SELECT
      app_order.id AS order_id,
      app_order.uid,
      app_order.rating,
      app_order.restaurant_id,
      app_order.date,
      app_order.name,
      app_order.email,
      app_order.address,
      ordered_item.dish_id,
      ordered_item.quantity,
      dish.name AS dish_name,
      dish.description AS dish_description,
      dish.price AS dish_price,
      dish.img AS dish_img,
      dish.category AS dish_category,
      restaurant.name AS restaurant_name,
      restaurant.logo_url AS restaurant_logo_url,
      restaurant.delivery_fee,
      restaurant.background_url AS restaurant_background_url,
      restaurant.min_order
    FROM app_order
    JOIN ordered_item ON app_order.id = ordered_item.order_id
    JOIN dish ON dish.id = ordered_item.dish_id
    JOIN restaurant ON app_order.restaurant_id = restaurant.id
    WHERE app_order.uid = $1
    ORDER BY app_order.date DESC
  `;
  const result = await pool.query(query, [uid]);

  const ordersMap = result.rows.reduce((acc, row) => {
    const orderId = row.order_id;
  
    if (!acc.has(orderId)) {
      acc.set(orderId, {
        id: orderId,
        uid: row.uid,
        rating: row.rating,
        restaurant_id: row.restaurant_id,
        date: row.date,
        name: row.name,
        email: row.email,
        address: row.address,
        city: row.city,
        amount_paid: row.amount_paid,
        itemDetails: [],
      });
    }
  
    const order = acc.get(orderId);
    order.itemDetails.push({
      id: row.dish_id,
      name: row.dish_name,
      description: row.dish_description,
      restaurant_id: row.restaurant_id,
      price: Number(row.dish_price),
      img: row.dish_img,
      category: row.dish_category,
      quantity: row.quantity,
    });
  
    return acc;
  }, new Map());
  
  return Array.from(ordersMap.values());
}



export async function createOrder(order: AppOrder): Promise<void> {
  const query = `
    INSERT INTO app_order (id, uid, restaurant_id, name, email, address)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;
  await pool.query(query, [
    order.id,
    order.uid,
    order.restaurant_id,
    order.name,
    order.email,
    order.address,
  ]);
}

export async function insertOrderedItems(orderedItems: Item[]): Promise<void> {
  const values: any[] = [];
  const placeholders = orderedItems
    .map((item, index) => {
      const offset = index * 3;
      values.push(item.order_id, item.quantity, item.dish_id);
      return `($${offset + 1}, $${offset + 2}, $${offset + 3})`;
    })
    .join(',');

  const query = `
    INSERT INTO ordered_item (order_id, quantity, dish_id)
    VALUES ${placeholders}
  `;
  await pool.query(query, values);
}



export async function updateOrderRating(orderId: string, uid: string, rating: number): Promise<void> {
  const query = `
    UPDATE app_order
    SET rating = $1
    WHERE id = $2 AND uid = $3
  `;
  await pool.query(query, [rating, orderId, uid]);
}

