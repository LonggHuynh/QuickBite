import React from "react";
import CartItem from "./CartItem";
import { useGetRestaurantById } from "../queries/useGetRestaurantById";
import { Order } from "../models/Order";


interface CartInfoProps {
    order: Order;

}
const CartInfo = ({ order }: CartInfoProps) => {


    const { data: restaurant } = useGetRestaurantById(order.restaurant_id);
    const subtotal = order.itemDetails.reduce((acc, item) => acc + item.price, 0);
    const total = subtotal + Number(restaurant?.delivery_fee ?? 0);
    return (
        <div className=" basket sticky top-20 bg-primaryOpposite grow-0 shrink-0 basis-[450px] px-9 pt-10 pb-20 flex flex-col h-[calc(100vh-80px)] drop-shadow-lg overflow-y-scroll scrollbar-none">
            <p className="self-center text-3xl  ">Basket</p>
            <div className="itemsContainer mt-10 flex flex-col gap-5">
                {order.itemDetails.map((item) => (
                    <CartItem key={item.id} editable={false} item={item} />
                ))}
            </div>

            {restaurant ? (
                <>
                    <div className="mt-auto h-full flex flex-col">



                        <div className="mt-auto h-full flex flex-col">
                            <div className="flex mt-auto text-sm">
                                <span>Min order </span>
                                <span className="ml-auto">
                                    ${restaurant.min_order}
                                </span>
                            </div>

                            <div className="flex mt-2 text-sm ">
                                <span>Subtotal </span>
                                <span className="ml-auto">${subtotal}</span>
                            </div>

                            <div className="flex mt-2 text-sm">
                                <span>Delivery </span>
                                <span className="ml-auto">
                                    ${restaurant.delivery_fee}
                                </span>
                            </div>

                            <div className="flex mt-3 text-lg font-medium">
                                <span>Total </span>
                                <span className="ml-auto">
                                    ${total}
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="mt-auto h-full flex items-center justify-center">
                    <p className="text-xl">Your cart is empty </p>
                </div>
            )}


        </div>
    );
};

export default CartInfo;
