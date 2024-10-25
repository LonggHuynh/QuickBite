import React from 'react';
import { useState } from 'react';
import OrderCard from '../components/OrderCard';
import CartInfo from '../components/CartInfo';
import './Checkout.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { useGetOrders } from '../queries/useGetOrders';
import { Order } from '../models/Order';
const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { data: orders = [], isLoading: isOrdersLoading } = useGetOrders();

  return !isOrdersLoading ? (
    <div className="checkout flex w-full">
      <div className=" flex-1 px-32 py-32  flex flex-col gap-10">
        <p className="text-4xl">Order History</p>

        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            selectOrder={() => setSelectedOrder(order)}
          />
        ))}
      </div>
      {selectedOrder && <CartInfo order={selectedOrder} />}
    </div>
  ) : (
    <div className=" flex items-center justify-center h-screen">
      <ClipLoader />
    </div>
  );
};

export default Orders;
