
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Restaurant } from '../models/Restaurant';
import api from '../api';




const createRestaurant = async (data: Restaurant) => {
    const res = await api.post<Restaurant>('/restaurants', data);
    return res.data;
}

export const useCreateRestaurant = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: createRestaurant,
        onSuccess: (data) => {
            client.setQueryData(['restaurants'], (old: Restaurant[] | undefined) => old?.concat(data) ?? [data]);
        }
    });
};

