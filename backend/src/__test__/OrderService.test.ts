import * as orderService from '../services/OrderService';
import * as orderDAO from '../daos/OrderDAO';
import * as dishDAO from '../daos/DishDAO';
import * as restaurantDAO from '../daos/RestaurantDAO';
import { AppOrder } from '../models/AppOrder';
import { CustomHttpError } from '../errors/CustomHttpError';

jest.mock('../daos/OrderDAO');
jest.mock('../daos/DishDAO');
jest.mock('../daos/RestaurantDAO');


const baseOrder = {
    id: 'order123',
    uid: 'user123',
    name: 'John Doe',
    city: 'Metropolis',

};

const mockedDishDAO = dishDAO as jest.Mocked<typeof dishDAO>;
const mockedRestaurantDAO = restaurantDAO as jest.Mocked<typeof restaurantDAO>;
const mockedOrderDAO = orderDAO as jest.Mocked<typeof orderDAO>;
describe('orderService.createOrder', () => {
    it('should create an order successfully', async () => {
        const order: AppOrder = {
            id: 'order123',
            uid: 'user123',
            restaurant_id: 'resto123',
            name: 'John Doe',
            city: 'Metropolis',
            amount_paid: 25.00,
            items: [
                { dish_id: 'dish1', quantity: 2, order_id: 'order123' },
                { dish_id: 'dish2', quantity: 1, order_id: 'order123' },
            ],
        };

        const dishes = [
            { id: 'dish1', price: 5.00, name: 'Dish 1', restaurant_id: 'resto123', description: 'Dish 1 description' },
            { id: 'dish2', price: 10.00, name: 'Dish 2', restaurant_id: 'resto123', description: 'Dish 2 description' },
        ];

        const restaurantDetails = {
            name: 'Restaurant 1',
            id: 'resto123',
            delivery_fee: 5.00,
            min_order: 15.00,
        };

        mockedDishDAO.getDishesByRestaurantIdAndIds.mockResolvedValue(dishes);
        mockedRestaurantDAO.getRestaurantById.mockResolvedValue(restaurantDetails);
        mockedOrderDAO.createOrder.mockResolvedValue();
        mockedOrderDAO.insertOrderedItems.mockResolvedValue();

        // Act
        const result = await orderService.createOrder(order);

        // Assert
        expect(result).toEqual(order);
        expect(mockedOrderDAO.createOrder).toHaveBeenCalledWith(order);
        expect(mockedOrderDAO.insertOrderedItems).toHaveBeenCalledWith(order.items);
    });

    it('should throw an error when a dish has an invalid price', async () => {
        // Arrange
        const order = {
            ...baseOrder,
            amount_paid: 25.00,
            restaurant_id: 'resto123',
            items: undefined,
        };


        const dishes = [{ id: 'dish1', price: 5, name: 'Dish 1', restaurant_id: 'resto123', description: 'Dish 1 description' }];
        const restaurantDetails = {
            id: 'resto123',
            name: 'Restaurant 1',
            delivery_fee: 5.00,
            min_order: 15.00,
        };

        mockedDishDAO.getDishesByRestaurantId.mockResolvedValue(dishes);
        mockedRestaurantDAO.getRestaurantById.mockResolvedValue(restaurantDetails);

        // Act & Assert
        await expect(orderService.createOrder(order)).rejects.toThrow(CustomHttpError);
        await expect(orderService.createOrder(order)).rejects.toThrow('Order items are required.');
    });

    it('should throw an error when the restaurant is not found', async () => {
        // Arrange
        const order: AppOrder = {
            ...baseOrder,
            amount_paid: 25.00,
            restaurant_id: 'resto123',
            items: [
                { dish_id: 'dish1', quantity: 2, order_id: 'order123' },
                { dish_id: 'dish2', quantity: 1, order_id: 'order123' },
            ]
        }

        mockedDishDAO.getDishesByRestaurantIdAndIds.mockResolvedValue([]);
        mockedRestaurantDAO.getRestaurantById.mockResolvedValue(undefined);

        // Act & Assert
        await expect(orderService.createOrder(order)).rejects.toThrow(CustomHttpError);
        await expect(orderService.createOrder(order)).rejects.toThrow('Restaurant not found');
    });

    it('should throw an error when dishes are not found', async () => {
        // Arrange
        const order: AppOrder = {

            ...baseOrder,
            amount_paid: 25.00,
            restaurant_id: 'resto123',
            items: [
                { dish_id: 'dish1', quantity: 2, order_id: 'order123' },
                { dish_id: 'dish2', quantity: 1, order_id: 'order123' },
            ]
        };

        mockedDishDAO.getDishesByRestaurantIdAndIds.mockResolvedValue([]);
        mockedRestaurantDAO.getRestaurantById.mockResolvedValue({
            delivery_fee: 5.00,
            min_order: 15.00,
            id: 'resto123',
            name: 'Restaurant 1',

        });

        // Act & Assert
        await expect(orderService.createOrder(order)).rejects.toThrow(CustomHttpError);
        await expect(orderService.createOrder(order)).rejects.toThrow('No dishes found for the given restaurant');
    });


    it('should throw an error when the amount paid does not match the calculated total', async () => {
        // Arrange
        const order: AppOrder = {
            ...baseOrder,
            amount_paid: 25.00,
            restaurant_id: 'resto123',
            items: [
                { dish_id: 'dish1', quantity: 2, order_id: 'order123' },
                { dish_id: 'dish2', quantity: 1, order_id: 'order123' },
            ]

        };

        const dishes = [
            { id: 'dish1', price: 10.00, name: 'Dish 1', restaurant_id: 'resto123', description: 'Dish 1 description' },
            { id: 'dish2', price: 10.00, name: 'Dish 2', restaurant_id: 'resto123', description: 'Dish 2 description' },
        ];

        const restaurantDetails = {
            name: 'Restaurant 1',
            description: 'Restaurant 1 description',
            id: 'resto123',
            delivery_fee: 5.00,
            min_order: 15.00,
        };

        mockedDishDAO.getDishesByRestaurantIdAndIds.mockResolvedValue(dishes);
        mockedRestaurantDAO.getRestaurantById.mockResolvedValue(restaurantDetails);

        // Act & Assert
        await expect(orderService.createOrder(order)).rejects.toThrow(CustomHttpError);
        await expect(orderService.createOrder(order)).rejects.toThrow('There is something wrong with your order.');
    });


    it('should throw an error when the minimum order price has not been reached', async () => {
        // Arrange
        const order: AppOrder = {
            ...baseOrder,
            amount_paid: 15.00,

            restaurant_id: 'resto123',

            items: [{ dish_id: 'dish1', quantity: 1, order_id: 'order123' },
            ],
        };

        const dishes = [{ id: 'dish1', price: 10.00, name: 'Dish 1', restaurant_id: 'resto123', description: 'Dish 1 description' }];
        const restaurantDetails = {
            delivery_fee: 5.00,
            min_order: 20.00,
            id: 'resto123',
            name: 'Restaurant 1',

        };

        mockedDishDAO.getDishesByRestaurantIdAndIds.mockResolvedValue(dishes);
        mockedRestaurantDAO.getRestaurantById.mockResolvedValue(restaurantDetails);

        // Act & Assert
        await expect(orderService.createOrder(order)).rejects.toThrow(CustomHttpError);
        await expect(orderService.createOrder(order)).rejects.toThrow('The minimum order price has not been reached yet.');
    });



});

describe('orderService.rateOrder', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update the order rating successfully', async () => {
        const uid = 'user123';
        const orderId = 'order123';
        const rating = 5;

        mockedOrderDAO.updateOrderRating.mockResolvedValue();

        await orderService.rateOrder(uid, orderId, rating);

        expect(mockedOrderDAO.updateOrderRating).toHaveBeenCalledWith(orderId, uid, 5);
    });
});


describe('orderService.getOrdersOfUser', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return the orders of a user', async () => {
        const uid = 'user123';
        const orders = [
            { id: 'order1', uid, name: 'John Doe', city: 'Metropolis', amount_paid: 25.00, items: [], restaurant_id: 'resto' },
            { id: 'order2', uid, name: 'Jane Doe', city: 'Gotham', amount_paid: 30.00, items: [], restaurant_id: 'resto1' },
        ];

        mockedOrderDAO.getUserOrdersFlat.mockResolvedValue(orders);

        const result = await orderService.getOrdersOfUser(uid);

        expect(result).toEqual(orders);
        expect(mockedOrderDAO.getUserOrdersFlat).toHaveBeenCalledWith(uid);
    });
});



