import React from "react";
import { useCartStore } from "../store/useCartStore";
import { Item } from "../models/Item";


interface CartItemProps {
    item: Item;
    editable: boolean;
}
const CartItem = ({ item, editable }: CartItemProps) => {
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
    const addToCart = useCartStore((state) => state.addToCart);

    return (
        <div className="flex items-center">
            <div className="left">
                <p className=" py-1">{item.name}</p>
                <p className="text-sm">${item.price}</p>
            </div>

            <div className="right ml-auto">
                <div className="quantity flex   ">
                    {editable && (
                        <button
                            className="h-5 w-5 border-4 rounded flex items-center justify-center"
                            onClick={() => decreaseQuantity(item)}
                        >
                            -
                        </button>
                    )}
                    <div className="w-5 h-5 p-1 flex items-center justify-center text-sm">
                        {item.quantity}
                    </div>
                    {editable && (
                        <button
                            className="h-5 w-5 border-4 rounded flex items-center justify-center"
                            onClick={() => addToCart(item)}
                        >
                            +
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartItem;
