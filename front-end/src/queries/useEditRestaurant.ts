
import { useMutation, useQueryClient } from '@tanstack/react-query';


import { Restaurant } from '../models/Restaurant';
import api from '../api';




const editRestaurant = async (data: Restaurant) => {
    api.put<Restaurant>(`/restaurants/${data.id}`, data);
}

export const useEditRestaurant = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: editRestaurant,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ['restaurants'] });
        }
    });
};

