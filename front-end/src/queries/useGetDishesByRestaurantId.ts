import { useQuery } from "@tanstack/react-query";
import { Restaurant } from "../models/Restaurant";
import api from "../api";
import { Dish } from "../models/Dish";

const getDishesByRestaurantId = async (restaurantId: string): Promise<Dish[]> => {
    const res = await api.get<Dish[]>(`/restaurants/${restaurantId}/dishes`);
    return res.data;
};

export const useGetDishesByRestaurantId = (restaurantId: string) => useQuery<Dish[]>({
    queryKey: ['restaurants', restaurantId, 'dishes'],
    queryFn: () => getDishesByRestaurantId(restaurantId),
});