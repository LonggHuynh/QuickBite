import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Dish } from '../models/Dish';
import api from '../api';

const editDish = async (data: Dish) => {
  const response = await api.put<Dish>(`/dishes/${data.id}`, data);
  return response.data;
};

export const useEditDish = (restaurant_id: string) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (dish: Dish) => editDish(dish),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['restaurants', restaurant_id, 'dishes'],
      });
    },
  });
};
