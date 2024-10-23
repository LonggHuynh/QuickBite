// src/services/restaurantService.ts
import { v4 as uuidv4 } from 'uuid';
import * as restaurantDAO from '../daos/RestaurantDAO';
import { Restaurant } from '../models/Restaurant';
import { CustomError } from '../errors/CustomError';

export async function createRestaurant(ownerId: string, restaurantData: Omit<Restaurant, 'id' | 'owner_id'>): Promise<Restaurant> {
  const restaurantId = uuidv4();

  const restaurant: Restaurant = {
    id: restaurantId,
    owner_id: ownerId, // Set the owner ID
    ...restaurantData,
  };

  await restaurantDAO.createRestaurant(restaurant);

  return restaurant;
}

export async function updateRestaurant(restaurantId: string, restaurant: Partial<Restaurant>): Promise<Restaurant> {

  const existingRestaurant = await restaurantDAO.getRestaurantById(restaurantId);
  if (!existingRestaurant) {
    throw new CustomError(404, 'Restaurant not found');
  }


  const updatedRestaurant: Restaurant = {
    ...existingRestaurant,
    ...restaurant,
  };

  await restaurantDAO.updateRestaurant(updatedRestaurant);
  return updatedRestaurant;
}

export async function getRestaurants(): Promise<Restaurant[]> {

  return restaurantDAO.getRestaurants();
}

export async function getRestaurantByOwnerId(ownerId: string): Promise<Restaurant> {
  const restaurant = await restaurantDAO.getRestaurantByOwnerId(ownerId);
  if (!restaurant) {
    throw new CustomError(404, 'Restaurant not found');
  }
  return restaurant;
}

export async function getRestaurantById(id: string): Promise<Restaurant> {
  const restaurant = await restaurantDAO.getRestaurantById(id);
  if (!restaurant) {
    throw new CustomError(404, 'Restaurant not found');
  }
  return restaurant;
}
