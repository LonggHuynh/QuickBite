import { QueryClient, useQuery } from '@tanstack/react-query';
import api from '../api';
import { Restaurant } from '../models/Restaurant';

const fetchRestaurantById = async (id: string) => {
  const res = await api.get<Restaurant>(`/restaurants/${id}`);
  return res.data;
};

export const useGetRestaurantById = (id: string | undefined) => {
  const queryClient = new QueryClient();
  return useQuery<Restaurant>({
    queryKey: ['restaurants', id],
    queryFn: () => fetchRestaurantById(id!),
    initialData: () =>
      queryClient
        .getQueryData<Restaurant[]>(['restaurants'])
        ?.find((restaurant) => restaurant.id === id),
    enabled: !!id,
  });
};
