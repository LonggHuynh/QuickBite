
import { useMutation, useQueryClient } from '@tanstack/react-query';


import { Dish } from '../models/Dish';
import api from '../api';


const createDish = async (data: Dish) => {
    const response = await api.post<Dish>(`/dishes`, data);
    return response.data;
}

export const useCreateDish = (restaurant_id: string) => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: (dish: Dish) => createDish(dish),
        onSuccess: (data) => {
            client.setQueryData(['restaurants', restaurant_id, 'dishes'], (old: Dish[] | undefined) => old?.concat(data) ?? [data]);
        }
    });
};

