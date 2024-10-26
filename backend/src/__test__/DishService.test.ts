import * as dishDAO from '../daos/DishDAO';
import * as restaurantDAO from '../daos/RestaurantDAO';
import * as dishService from '../services/DishService';
import { Dish } from '../models/Dish';
import { CustomHttpError } from '../errors/CustomHttpError';
import { Restaurant } from '../models/Restaurant';

jest.mock('../daos/DishDAO');
jest.mock('../daos/RestaurantDAO');

const mockedDishDAO = dishDAO as jest.Mocked<typeof dishDAO>;
const mockedRestaurantDAO = restaurantDAO as jest.Mocked<typeof restaurantDAO>;

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
      const existingRestaurant: Restaurant = {
        id: 'r1',
        owner_id: 'u1',
        name: 'Existing Restaurant',
        logo_url: 'http://example.com/logo.png',
        delivery_fee: 5,
        background_url: 'http://example.com/bg.png',
        min_order: 10,
      };
      const uid = 'u1';

      mockedDishDAO.createDish.mockResolvedValueOnce();
      mockedRestaurantDAO.getRestaurantByOwnerId.mockResolvedValueOnce(existingRestaurant);
      await dishService.createDish(newDish, uid);

      expect(mockedDishDAO.createDish).toHaveBeenCalledWith(newDish);
    });
    it('should throw CustomHttpError 404 if restaurant not found', async () => {
      const newDish: Dish = {
        id: '2',
        name: 'Pizza',
        description: 'Cheesy pizza',
        price: 15.99,
      };
      const uid = 'u1';

      mockedRestaurantDAO.getRestaurantByOwnerId.mockResolvedValueOnce(
        undefined,
      );

      await expect(dishService.createDish(newDish, uid)).rejects.toEqual(
        new CustomHttpError(404, 'Restaurant not found'),
      );

      expect(mockedRestaurantDAO.getRestaurantByOwnerId).toHaveBeenCalledWith(
        uid,
      );
      expect(mockedDishDAO.createDish).not.toHaveBeenCalled();
    });

    it('should throw an error if DAO fails', async () => {
      const newDish: Dish = {
        id: '2',
        name: 'Pizza',
        description: 'Cheesy pizza',
        price: 15.99,
      };
      const existingRestaurant: Restaurant = {
        id: 'r1',
        owner_id: 'u1',
        name: 'Existing Restaurant',
        logo_url: 'http://example.com/logo.png',
        delivery_fee: 5,
        background_url: 'http://example.com/bg.png',
        min_order: 10,
      };

      const uid = 'u1';

      mockedRestaurantDAO.getRestaurantByOwnerId.mockResolvedValueOnce(
        existingRestaurant,
      );
      mockedDishDAO.createDish.mockRejectedValueOnce(new Error('DAO Error'));

      await expect(dishService.createDish(newDish, uid)).rejects.toThrow(
        'DAO Error',
      );

      expect(mockedRestaurantDAO.getRestaurantByOwnerId).toHaveBeenCalledWith(
        uid,
      );
      expect(newDish.restaurant_id).toBe(existingRestaurant.id);
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

      const result = await dishService.updateDish(
        dishId,
        restaurantId,
        updates,
      );

      expect(mockedDishDAO.getDishById).toHaveBeenCalledWith(dishId);
      expect(mockedDishDAO.updateDish).toHaveBeenCalledWith(updatedDish);
      expect(result).toEqual(updatedDish);
    });

    it('should throw CustomHttpError 404 if dish does not exist', async () => {
      const dishId = '2';
      const restaurantId = 'r1';
      const updates: Partial<Dish> = {
        price: 10.99,
      };

      mockedDishDAO.getDishById.mockResolvedValueOnce(null);

      await expect(
        dishService.updateDish(dishId, restaurantId, updates),
      ).rejects.toEqual(new CustomHttpError(404, 'Dish not found'));

      expect(mockedDishDAO.getDishById).toHaveBeenCalledWith(dishId);
      expect(mockedDishDAO.updateDish).not.toHaveBeenCalled();
    });

    it('should throw CustomHttpError 404 if restaurant_id does not match', async () => {
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

      await expect(
        dishService.updateDish(dishId, restaurantId, updates),
      ).rejects.toEqual(new CustomHttpError(404, 'Dish not found'));

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

      const result = await dishService.updateDish(
        dishId,
        restaurantId,
        updates,
      );

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

      mockedDishDAO.getDishesByRestaurantId.mockResolvedValueOnce(dishes);

      const result = await dishService.getDishesByRestaurantId(restaurantId);

      expect(mockedDishDAO.getDishesByRestaurantId).toHaveBeenCalledWith(
        restaurantId,
      );
      expect(result).toEqual(dishes);
    });

    it('should return an empty array if no dishes are found', async () => {
      const restaurantId = 'r2';

      // Mock DAO method to return empty array
      mockedDishDAO.getDishesByRestaurantId.mockResolvedValueOnce([]);

      const result = await dishService.getDishesByRestaurantId(restaurantId);

      expect(mockedDishDAO.getDishesByRestaurantId).toHaveBeenCalledWith(
        restaurantId,
      );
      expect(result).toEqual([]);
    });

    it('should throw an error if DAO fails', async () => {
      const restaurantId = 'r3';

      // Mock DAO method to reject
      mockedDishDAO.getDishesByRestaurantId.mockRejectedValueOnce(
        new Error('DAO Error'),
      );

      await expect(
        dishService.getDishesByRestaurantId(restaurantId),
      ).rejects.toThrow('DAO Error');

      expect(mockedDishDAO.getDishesByRestaurantId).toHaveBeenCalledWith(
        restaurantId,
      );
    });
  });
});
