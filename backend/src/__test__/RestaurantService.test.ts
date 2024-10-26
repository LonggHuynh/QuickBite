// src/services/restaurantService.test.ts

  import { v4 as uuidv4 } from 'uuid';

import {
    createRestaurant,
    updateRestaurant,
    getRestaurants,
    getRestaurantByOwnerId,
    getRestaurantById,
  } from '../services/RestaurantService';
  import * as restaurantDAO from '../daos/RestaurantDAO';
  import { Restaurant } from '../models/Restaurant';
  import { CustomHttpError } from '../errors/CustomHttpError';
  
  jest.mock('../daos/RestaurantDAO'); // Mock the DAO module
  jest.mock('uuid'); // Mock the uuid module
  
  const mockedRestaurantDAO = restaurantDAO as jest.Mocked<typeof restaurantDAO>;
  const mockedUuidv4 = uuidv4 as jest.MockedFunction<typeof uuidv4>;
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('createRestaurant', () => {
    it('should create a new restaurant and return it', async () => {
      const ownerId = 'owner123';
      const restaurantData: Omit<Restaurant, 'id' | 'owner_id'> = {
        name: 'Test Restaurant',
        logo_url: 'http://example.com/logo.png',
        delivery_fee: 5,
        background_url: 'http://example.com/bg.png',
        min_order: 10,
      };
  
      mockedUuidv4.mockReturnValue('test-uuid');
  
      mockedRestaurantDAO.createRestaurant.mockResolvedValue();
  
      const restaurant = await createRestaurant(ownerId, restaurantData);
  
      expect(restaurant.id).toBe('test-uuid');
      expect(restaurant.owner_id).toBe(ownerId);
      expect(restaurant.name).toBe(restaurantData.name);
      expect(restaurant.logo_url).toBe(restaurantData.logo_url);
      expect(restaurant.delivery_fee).toBe(restaurantData.delivery_fee);
      expect(restaurant.background_url).toBe(restaurantData.background_url);
      expect(restaurant.min_order).toBe(restaurantData.min_order);
  
      expect(mockedRestaurantDAO.createRestaurant).toHaveBeenCalledWith(restaurant);
    });
  });
  
  describe('updateRestaurant', () => {
    it('should update an existing restaurant and return it', async () => {
      const restaurantId = 'restaurant123';
      const existingRestaurant: Restaurant = {
        id: restaurantId,
        owner_id: 'owner123',
        name: 'Existing Restaurant',
        logo_url: 'http://example.com/logo.png',
        delivery_fee: 5,
        background_url: 'http://example.com/bg.png',
        min_order: 10,
      };
  
      const updateData: Partial<Restaurant> = {
        name: 'Updated Restaurant',
        min_order: 15,
      };
  
      const updatedRestaurant = { ...existingRestaurant, ...updateData };
  
      mockedRestaurantDAO.getRestaurantById.mockResolvedValue(existingRestaurant);
      mockedRestaurantDAO.updateRestaurant.mockResolvedValue();
  
      const result = await updateRestaurant(restaurantId, updateData);
  
      expect(result).toEqual(updatedRestaurant);
      expect(mockedRestaurantDAO.getRestaurantById).toHaveBeenCalledWith(restaurantId);
      expect(mockedRestaurantDAO.updateRestaurant).toHaveBeenCalledWith(updatedRestaurant);
    });
  
    it('should throw a CustomHttpError when the restaurant does not exist', async () => {
      const restaurantId = 'nonexistent123';
      const updateData: Partial<Restaurant> = {
        name: 'Updated Restaurant',
        min_order: 15,
      };
  
      mockedRestaurantDAO.getRestaurantById.mockResolvedValue(undefined);
  
      await expect(updateRestaurant(restaurantId, updateData)).rejects.toThrow(
        new CustomHttpError(404, 'Restaurant not found')
      );
      expect(mockedRestaurantDAO.getRestaurantById).toHaveBeenCalledWith(restaurantId);
    });
  });
  
  describe('getRestaurants', () => {
    it('should return a list of restaurants', async () => {
      const restaurants: Restaurant[] = [
        {
          id: 'restaurant1',
          owner_id: 'owner1',
          name: 'Restaurant 1',
          delivery_fee: 5,
          min_order: 10,
        },
        {
          id: 'restaurant2',
          owner_id: 'owner2',
          name: 'Restaurant 2',
          delivery_fee: 7,
          min_order: 15,
        },
      ];
  
      mockedRestaurantDAO.getRestaurants.mockResolvedValue(restaurants);
  
      const result = await getRestaurants();
  
      expect(result).toEqual(restaurants);
      expect(mockedRestaurantDAO.getRestaurants).toHaveBeenCalled();
    });
  });
  
  describe('getRestaurantByOwnerId', () => {
    it('should return a restaurant by owner id', async () => {
      const ownerId = 'owner123';
      const restaurant: Restaurant = {
        id: 'restaurant123',
        owner_id: ownerId,
        name: 'Test Restaurant',
        delivery_fee: 5,
        min_order: 10,
      };
  
      mockedRestaurantDAO.getRestaurantByOwnerId.mockResolvedValue(restaurant);
  
      const result = await getRestaurantByOwnerId(ownerId);
  
      expect(result).toEqual(restaurant);
      expect(mockedRestaurantDAO.getRestaurantByOwnerId).toHaveBeenCalledWith(ownerId);
    });
  
    it('should throw a CustomHttpError when the restaurant is not found', async () => {
      const ownerId = 'nonexistentOwner';
  
      mockedRestaurantDAO.getRestaurantByOwnerId.mockResolvedValue(undefined);
  
      await expect(getRestaurantByOwnerId(ownerId)).rejects.toThrow(
        new CustomHttpError(404, 'Restaurant not found')
      );
      expect(mockedRestaurantDAO.getRestaurantByOwnerId).toHaveBeenCalledWith(ownerId);
    });
  });
  
  describe('getRestaurantById', () => {
    it('should return a restaurant by id', async () => {
      const id = 'restaurant123';
      const restaurant: Restaurant = {
        id: id,
        owner_id: 'owner123',
        name: 'Test Restaurant',
        delivery_fee: 5,
        min_order: 10,
      };
  
      mockedRestaurantDAO.getRestaurantById.mockResolvedValue(restaurant);
  
      const result = await getRestaurantById(id);
  
      expect(result).toEqual(restaurant);
      expect(mockedRestaurantDAO.getRestaurantById).toHaveBeenCalledWith(id);
    });
  
    it('should throw a CustomHttpError when the restaurant is not found', async () => {
      const id = 'nonexistentId';
  
      mockedRestaurantDAO.getRestaurantById.mockResolvedValue(undefined);
  
      await expect(getRestaurantById(id)).rejects.toThrow(
        new CustomHttpError(404, 'Restaurant not found')
      );
      expect(mockedRestaurantDAO.getRestaurantById).toHaveBeenCalledWith(id);
    });
  });
  