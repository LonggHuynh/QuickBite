import * as dishDAO from "../daos/DishDAO";
import { Dish } from "../models/Dish";
import { CustomHttpError } from "../errors/CustomHttpError";
import * as restaurantDAO from "../daos/RestaurantDAO";

export const createDish = async (dish: Dish, uid: string): Promise<Dish> => {
  const restaurant = await restaurantDAO.getRestaurantByOwnerId(uid);
  if (!restaurant) {
    throw new CustomHttpError(404, "Restaurant not found");
  }

  dish.restaurant_id = restaurant.id;
  await dishDAO.createDish(dish);
  return dish;
};

export const updateDish = async (
  dishId: string,
  restaurant_id: string,
  dish: Partial<Dish>
): Promise<Dish> => {
  const existingDish = await dishDAO.getDishById(dishId);
  if (!existingDish || existingDish.restaurant_id !== restaurant_id) {
    throw new CustomHttpError(404, "Dish not found");
  }
  
  const updatedDish: Dish = {
    ...existingDish,
    ...dish,
  };

  await dishDAO.updateDish(updatedDish);
  return updatedDish;
};

export const getDishesByRestaurantId = async (
  restaurantId: string
): Promise<Dish[]> => {
  return dishDAO.getDishesByRestaurantId(restaurantId);
};
