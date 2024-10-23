import { Item } from "./Item";
import { Restaurant } from "./Restaurant";

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