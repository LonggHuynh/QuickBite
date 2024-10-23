
export interface CartItemDTO {
  id: string;
  quantity: number;
}

export interface CreateOrderDTO {
  amount_paid: number;
  items: CartItemDTO[];
  restaurant_id: string;

  name: string;
  email?: string;
  address: string;
  city: string;
  postcode?: string;
}

