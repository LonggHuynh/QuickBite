import React from "react";
import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import CartInfo from "../components/CartInfo";
import "./Checkout.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import orderService from "../services/orderService";
const Orders = () => {
    const [value, setValue] = useState(false);

    const accessToken = useSelector((state) => state.user?.accessToken);

    const [selectedOrder, setSelectedOrder] = useState({ items: [] });

    const [orders, setOrders] = useState(null);
    useEffect(() => {
        const loadOrders = async () => {
            try {
                const ordersData = await orderService.fetchOrders(accessToken);
                setOrders(ordersData);
            } catch (error) {
                toast.error(error.message);
            }
        };

        loadOrders();
    }, [value, accessToken]);

    return orders ? (
        <div className="checkout flex w-full">
            <div className=" flex-1 px-32 py-32  flex flex-col gap-10">
                <p className="text-4xl">Order History</p>

                {orders.map((order) => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        selectOrder={() => setSelectedOrder(order)}
                        rerender={() => setValue((prev) => !prev)}
                    />
                ))}
            </div>
            <CartInfo
                items={selectedOrder.items}
                restaurant={selectedOrder.restaurant}
                price={selectedOrder.price}
            />
        </div>
    ) : (
        <div className=" flex items-center justify-center h-screen">
            <ClipLoader />
        </div>
    );
};

export default Orders;
