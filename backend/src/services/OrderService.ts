import { AppOrder } from '../models/AppOrder';
import { CustomHttpError } from '../errors/CustomHttpError';
import * as dishDao from '../daos/DishDAO';
import * as restaurantDao from '../daos/RestaurantDAO';
import * as orderDao from '../daos/OrderDAO';



export function getOrdersOfUser(uid: string): Promise<AppOrder[]> {
  return orderDao.getUserOrdersFlat(uid);
}

export async function createOrder(order: AppOrder): Promise<AppOrder> {

  const { amount_paid, items, restaurant_id } = order;


  if (!items || items.length === 0) {
    throw new CustomHttpError(400, 'Order items are required.');
  }
  const restaurantDetails = await restaurantDao.getRestaurantById(restaurant_id);
  if (!restaurantDetails) {
    throw new CustomHttpError(400, 'Restaurant not found');
  }

  const dishIds = items.map((item) => item.dish_id);
  const dishes = await dishDao.getDishesByRestaurantIdAndIds(restaurant_id, dishIds);

  if (dishes.length === 0) {
    throw new CustomHttpError(400, 'No dishes found for the given restaurant');
  }




  const priceMap = dishes.reduce((map: Record<string, number>, dish) => {
    map[dish.id] = Number(dish.price);
    return map;
  }, {});


  const total = items.reduce((acc, item) => acc + priceMap[item.dish_id] * item.quantity, Number(restaurantDetails.delivery_fee));
  if (amount_paid !== total) {
    throw new CustomHttpError(400, 'There is something wrong with your order.');
  }

  if (total - restaurantDetails.delivery_fee < restaurantDetails.min_order) {
    throw new CustomHttpError(400, 'The minimum order price has not been reached yet.');
  }


  await orderDao.createOrder(order);
  await orderDao.insertOrderedItems(items!);

  return order;
}




export async function rateOrder(uid: string, orderId: string, rating: number): Promise<void> {
  await orderDao.updateOrderRating(orderId, uid, rating);

}

