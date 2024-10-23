import { create } from "zustand";
import { Item } from "../models/Item";
import { Dish } from "../models/Dish";
import { Restaurant } from "../models/Restaurant";

interface CartState {
    restaurant: Restaurant | null;
    items: Item[];
    addToCart: (dish: Dish, restaurant?: Restaurant) => void;
    removeFromCart: (dish: Dish) => void;
    decreaseQuantity: (dish: Dish) => void;
    clearCart: () => void;
    calculateSubtotal: () => number;
    calculateTotal: () => number;
    okToCheckout: () => boolean;
}

export const useCartStore = create<CartState>((set, get) => ({
    restaurant: null,
    items: [],

    addToCart: (dish: Dish, restaurant?: Restaurant) => set((state: CartState) => {


        let updatedItems: Item[] = [...state.items];
        const existingItem = state.items.find((i) => i.id === dish.id);
        if (existingItem) {
            updatedItems = state.items.map((i) =>
                i.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i
            );
        } else {
            updatedItems.push({ ...dish, quantity: 1 });
        }
        return {
            items: updatedItems,
            restaurant: restaurant ?? state.restaurant
        };
    }),

    removeFromCart: (dish: Dish) => set((state: CartState) => {
        const updatedItems = state.items.filter((item) => item.id !== dish.id);
        return {
            ...state,
            restaurant: updatedItems.length > 0 ? state.restaurant : null,
            items: updatedItems,
        };
    }),

    decreaseQuantity: (dish: Dish) => set((state: CartState) => {
        const updatedItems = state.items
            .map(item => item.id === dish.id ? { ...item, quantity: item.quantity - 1 } : item)
            .filter((i) => i.quantity > 0);
        return {
            items: updatedItems,
            restaurant: updatedItems.length > 0 ? state.restaurant : null,
        };
    }),

    clearCart: () => set(() => ({
        restaurant: null,
        items: [],
    })),

    calculateSubtotal: () => {
        const state = get();
        return state.items.reduce((subtotal, item) => {
            return subtotal + item.price * item.quantity;
        }, 0);
    },

    calculateTotal: () => {
        const state = get();
        return state.calculateSubtotal() + Number(state.restaurant?.delivery_fee ?? 0);
    },

    okToCheckout: () => {
        const state = get();

        return state.items.length > 0 && (state.restaurant?.min_order ?? 0) <= state.calculateTotal();
    }
}));
