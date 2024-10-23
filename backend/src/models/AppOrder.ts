import { Item } from "./Item";
import { ItemDetails } from "./ItemDetails";


export interface AppOrder {
  id?: string;
  uid: string;
  rating?: number;
  restaurant_id: string;
  date?: Date;
  name: string;
  email?: string;
  address?: string;
  items?: Item[];
  city: string;
  postcode?: string;
  amount_paid: number;
  itemDetails?: ItemDetails[];
}

