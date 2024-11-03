// src/dao/RestaurantDAO.ts
import pool from '../configs/database';
import { Restaurant } from '../models/Restaurant';

export async function createRestaurant(restaurant: Restaurant): Promise<void> {
  const { id, name, logo_url, delivery_fee, background_url, min_order, owner_id } = restaurant;
  const query = `
    INSERT INTO restaurant (id, name, logo_url, delivery_fee, background_url, min_order, owner_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;
  await pool.query(query, [id, name, logo_url, delivery_fee, background_url, min_order, owner_id]);
}

export async function updateRestaurant(restaurant: Restaurant): Promise<void> {
  const { name, logo_url, delivery_fee, background_url, min_order, id } = restaurant;
  const query = `
    UPDATE restaurant
    SET name = $1, logo_url = $2, delivery_fee = $3, background_url = $4, min_order = $5
    WHERE id = $6
  `;
  await pool.query(query, [name, logo_url, delivery_fee, background_url, min_order, id]);
}

export async function getRestaurantByOwnerId(ownerId: string): Promise<Restaurant | undefined> {
  const query = `
    SELECT * FROM restaurant
    WHERE owner_id = $1
  `;
  const result = await pool.query<Restaurant>(query, [ownerId]);
  return result.rows.at(0);
}

export async function getRestaurantById(id: string): Promise<Restaurant | undefined> {
  const query = `SELECT * FROM restaurant WHERE id = $1`;
  const result = await pool.query<Restaurant>(query, [id]);
  return result.rows.at(0);
}


export async function getRestaurants(): Promise<Restaurant[]> {
  const query = `SELECT * FROM restaurant`;
  const result = await pool.query<Restaurant>(query);
  return result.rows;
}