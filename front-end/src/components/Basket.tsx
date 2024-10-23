import React from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCartStore } from "../store/useCartStore";

interface BasketProps {
    editable: boolean;
}
const Basket = ({ editable }: BasketProps) => {
    const navigate = useNavigate();
    const items = useCartStore((state) => state.items);
    const restaurant = useCartStore((state) => state.restaurant);
    const total = useCartStore((state) => state.calculateTotal());
    const subtotal = useCartStore((state) => state.calculateSubtotal());
    const okToCheckout = useCartStore((state) => state.okToCheckout);

    const handleCheckout = () => {
        if (!okToCheckout()) toast.error("Minimum order not met.");
        else navigate("/checkout");
    };

    return (
        <div className=" basket sticky top-20 bg-primaryOpposite grow-0 shrink-0 basis-[450px] px-9 pt-10 pb-20 flex flex-col h-[calc(100vh-80px)] drop-shadow-lg overflow-y-scroll scrollbar-none">
            <p className="self-center text-3xl  ">Basket</p>
            <div className="itemsContainer mt-10 flex flex-col gap-5">
                {items.map((item) => (
                    <CartItem key={item.id} editable={editable} item={item} />
                ))}
            </div>

            {restaurant ? (
                <>
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
                </>
            ) : (
                <div className="mt-auto h-full flex items-center justify-center">
                    <p className="text-xl">Your cart is empty </p>
                </div>
            )}

            {editable && (
                <button
                    className="mt-10 text-lg  text-primaryOpposite bg-primary border rounded-lg py-2 flex items-center justify-center"
                    onClick={handleCheckout}
                >
                    Check out
                </button>
            )}
        </div>
    );
};

export default Basket;
