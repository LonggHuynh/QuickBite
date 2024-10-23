// src/dao/DishDAO.ts
import pool from '../config/database';
import { Dish } from '../models/Dish';

export const createDish = async (dish: Dish): Promise<void> => {
  const { id, name, description, restaurant_id, img, price, category } = dish;
  const query = `
      INSERT INTO dish (id, name, description, restaurant_id, img, price, category)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
  await pool.query(query, [id, name, description, restaurant_id, img, price, category]);
}

export const updateDish = async (dish: Dish): Promise<void> => {
  const { name, description, img, price, category, id, restaurant_id } = dish;
  const query = `
      UPDATE dish
      SET name = $1, description = $2, img = $3, price = $4, category = $5
      WHERE id = $6 AND restaurant_id = $7
    `;
  await pool.query(query, [name, description, img, price, category, id, restaurant_id]);
}

export const getDishById = async (id: string): Promise<Dish | null> => {
  const query = `
      SELECT id, name, description, restaurant_id, img, price, category
      FROM dish
      WHERE id = $1
    `;
  
  const result = await pool.query(query, [id]);

  if (result.rows.length > 0) {
    const dish: Dish = result.rows[0];
    return dish;
  } else {
    return null;
  }
}




export  const  getDishesByRestaurantIdAndIds = async  (
  restaurantId: string,
  dishIds: string[]
): Promise<Dish[]> =>{
  const query = `
    SELECT id, name, description, restaurant_id, price, img, category
    FROM dish
    WHERE restaurant_id = $1 AND id = ANY($2::uuid[])
  `;
  const result = await pool.query(query, [restaurantId, dishIds]);
  return result.rows;
}


export async function getDishesByRestaurantId(restaurantId: string): Promise<Dish[]> {
  const query = `
    SELECT id, name, description, restaurant_id, price, img, category
    FROM dish
    WHERE restaurant_id = $1
    ORDER BY name ASC
  `;
  
  const result = await pool.query<Dish>(query, [restaurantId]);
  return result.rows;
}


