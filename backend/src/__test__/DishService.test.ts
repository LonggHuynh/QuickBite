// DishService.test.ts

import * as dishDAO from '../daos/DishDAO';
import { createDish, updateDish, getDishesByRestaurantId } from '../services/DishService';
import { Dish } from '../models/Dish';
import { CustomError } from '../errors/CustomError';

jest.mock('../daos/DishDAO');

const mockedDishDAO = dishDAO as jest.Mocked<typeof dishDAO>;

describe('Dish Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createDish', () => {
    it('should create and return the dish', async () => {
      const newDish: Dish = {
        id: '1',
        name: 'Pasta',
        description: 'Delicious pasta',
        restaurant_id: 'r1',
        price: 12.99,
      };

      mockedDishDAO.createDish.mockResolvedValueOnce();

      const result = await createDish(newDish);

      expect(mockedDishDAO.createDish).toHaveBeenCalledWith(newDish);
      expect(result).toEqual(newDish);
    });

    it('should throw an error if DAO fails', async () => {
      const newDish: Dish = {
        id: '2',
        name: 'Pizza',
        description: 'Cheesy pizza',
        restaurant_id: 'r1',
        price: 15.99,
      };

      mockedDishDAO.createDish.mockRejectedValueOnce(new Error('DAO Error'));

      await expect(createDish(newDish)).rejects.toThrow('DAO Error');
      expect(mockedDishDAO.createDish).toHaveBeenCalledWith(newDish);
    });
  });

  describe('updateDish', () => {
    it('should update and return the dish when it exists and belongs to the restaurant', async () => {
      const dishId = '1';
      const restaurantId = 'r1';
      const existingDish: Dish = {
        id: dishId,
        name: 'Salad',
        description: 'Fresh salad',
        restaurant_id: restaurantId,
        price: 8.99,
      };
      const updates: Partial<Dish> = {
        price: 9.99,
        description: 'Very fresh salad',
      };
      const updatedDish: Dish = { ...existingDish, ...updates };

      mockedDishDAO.getDishById.mockResolvedValueOnce(existingDish);
      mockedDishDAO.updateDish.mockResolvedValueOnce();

      const result = await updateDish(dishId, restaurantId, updates);

      expect(mockedDishDAO.getDishById).toHaveBeenCalledWith(dishId);
      expect(mockedDishDAO.updateDish).toHaveBeenCalledWith(updatedDish);
      expect(result).toEqual(updatedDish);
    });

    it('should throw CustomError 404 if dish does not exist', async () => {
      const dishId = '2';
      const restaurantId = 'r1';
      const updates: Partial<Dish> = {
        price: 10.99,
      };

      mockedDishDAO.getDishById.mockResolvedValueOnce(null);

      await expect(updateDish(dishId, restaurantId, updates)).rejects.toEqual(
        new CustomError(404, 'Dish not found')
      );

      expect(mockedDishDAO.getDishById).toHaveBeenCalledWith(dishId);
      expect(mockedDishDAO.updateDish).not.toHaveBeenCalled();
    });

    it('should throw CustomError 404 if restaurant_id does not match', async () => {
      const dishId = '3';
      const restaurantId = 'r2';
      const existingDish: Dish = {
        id: dishId,
        name: 'Burger',
        description: 'Juicy burger',
        restaurant_id: 'r1',
        price: 11.99,
      };
      const updates: Partial<Dish> = {
        price: 12.99,
      };

      mockedDishDAO.getDishById.mockResolvedValueOnce(existingDish);

      await expect(updateDish(dishId, restaurantId, updates)).rejects.toEqual(
        new CustomError(404, 'Dish not found')
      );

      expect(mockedDishDAO.getDishById).toHaveBeenCalledWith(dishId);
      expect(mockedDishDAO.updateDish).not.toHaveBeenCalled();
    });

    it('should handle partial updates correctly', async () => {
      const dishId = '4';
      const restaurantId = 'r3';
      const existingDish: Dish = {
        id: dishId,
        name: 'Soup',
        description: 'Hot soup',
        restaurant_id: restaurantId,
        price: 5.99,
      };
      const updates: Partial<Dish> = {
        img: 'soup.png',
      };
      const updatedDish: Dish = { ...existingDish, ...updates };

      // Mock DAO methods
      mockedDishDAO.getDishById.mockResolvedValueOnce(existingDish);
      mockedDishDAO.updateDish.mockResolvedValueOnce();

      const result = await updateDish(dishId, restaurantId, updates);

      expect(mockedDishDAO.getDishById).toHaveBeenCalledWith(dishId);
      expect(mockedDishDAO.updateDish).toHaveBeenCalledWith(updatedDish);
      expect(result).toEqual(updatedDish);
    });
  });

  describe('getDishesByRestaurantId', () => {
    it('should return an array of dishes for the given restaurant ID', async () => {
      const restaurantId = 'r1';
      const dishes: Dish[] = [
        {
          id: '1',
          name: 'Steak',
          description: 'Grilled steak',
          restaurant_id: restaurantId,
          price: 25.99,
        },
        {
          id: '2',
          name: 'Fish',
          description: 'Fried fish',
          restaurant_id: restaurantId,
          price: 18.99,
        },
      ];

      // Mock DAO method
      mockedDishDAO.getDishesByRestaurantId.mockResolvedValueOnce(dishes);

      const result = await getDishesByRestaurantId(restaurantId);

      expect(mockedDishDAO.getDishesByRestaurantId).toHaveBeenCalledWith(restaurantId);
      expect(result).toEqual(dishes);
    });

    it('should return an empty array if no dishes are found', async () => {
      const restaurantId = 'r2';

      // Mock DAO method to return empty array
      mockedDishDAO.getDishesByRestaurantId.mockResolvedValueOnce([]);

      const result = await getDishesByRestaurantId(restaurantId);

      expect(mockedDishDAO.getDishesByRestaurantId).toHaveBeenCalledWith(restaurantId);
      expect(result).toEqual([]);
    });

    it('should throw an error if DAO fails', async () => {
      const restaurantId = 'r3';

      // Mock DAO method to reject
      mockedDishDAO.getDishesByRestaurantId.mockRejectedValueOnce(new Error('DAO Error'));

      await expect(getDishesByRestaurantId(restaurantId)).rejects.toThrow('DAO Error');

      expect(mockedDishDAO.getDishesByRestaurantId).toHaveBeenCalledWith(restaurantId);
    });
  });
});
