import * as dishDAO from '../daos/DishDAO';
import { Dish } from '../models/Dish';
import { CustomError } from '../errors/CustomError';

export const createDish = async (dish: Dish): Promise<Dish> => {
  await dishDAO.createDish(dish);
  return dish;
}

export const updateDish = async (dishId: string, restaurant_id: string, dish: Partial<Dish>): Promise<Dish> => {
  const existingDish = await dishDAO.getDishById(dishId);
  if (!existingDish || existingDish.restaurant_id !== restaurant_id) {
    throw new CustomError(404, 'Dish not found');
  }


  const updatedDish: Dish = {
    ...existingDish,
    ...dish,
  };

  await dishDAO.updateDish(updatedDish);
  return updatedDish;
}


export const getDishesByRestaurantId = async (restaurantId: string): Promise<Dish[]> => {
  return dishDAO.getDishesByRestaurantId(restaurantId);
}

