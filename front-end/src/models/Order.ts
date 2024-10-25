import { Item } from './Item';

export interface Order {
  id?: string;
  itemDetails: Item[];

  restaurant_id?: string;
  amount_paid: number;
  rating?: number;
  address: string;
  date: string;
  name: string;
  email: string;
}
