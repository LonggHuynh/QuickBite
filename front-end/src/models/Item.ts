import { Dish } from './Dish';

export interface Item extends Dish {
  quantity: number;
}
