import React from "react";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Basket = ({ editable }) => {
    const navigate = useNavigate();
    const { items, price, restaurant } = useSelector((state) => state.cart);

    const handleCheckout = () => {
        if (!restaurant) toast.error("You have nothing in the cart.");
        else if (restaurant.min_order > price)
            toast.error(
                "Please add more items to meet the minimum order requirement."
            );
        else navigate("/checkout");
    };
    return (
        <div className=" basket sticky top-20 bg-primaryOpposite grow-0 shrink-0 basis-[450px] px-9 pt-10 pb-20 flex flex-col h-[calc(100vh-80px)] drop-shadow-lg overflow-y-scroll scrollbar-none">
            <p className="self-center text-3xl  ">Basket</p>
            <div className="itemsContainer mt-10 flex flex-col gap-5">
                {items.map((item) => (
                    <CartItem key={item.id} editable={editable} dish={item} />
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
                            <span className="ml-auto">${price}</span>
                        </div>

                        <div className="flex mt-2 text-sm">
                            <span>Delivery </span>
                            <span className="ml-auto">
                                ${restaurant.delivery_cost}
                            </span>
                        </div>

                        <div className="flex mt-3 text-lg font-medium">
                            <span>Total </span>
                            <span className="ml-auto">
                                ${price + Number(restaurant.delivery_cost)}
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
