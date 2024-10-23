import { useQuery } from "@tanstack/react-query";
import { Restaurant } from "../models/Restaurant";
import api from "../api";
import { Dish } from "../models/Dish";
import { Order } from "../models/Order";

const getOrders = async (): Promise<Order[]> => {
    const res = await api.get<Order[]>("/orders");
    return res.data;
};

export const useGetOrders = () => useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: getOrders,
});