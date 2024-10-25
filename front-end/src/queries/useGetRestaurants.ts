import { useQuery } from '@tanstack/react-query';
import { Restaurant } from '../models/Restaurant';
import api from '../api';

const getRestaurants = async (): Promise<Restaurant[]> => {
  const res = await api.get<Restaurant[]>('/restaurants');
  return res.data;
};

export const useGetRestaurants = () =>
  useQuery<Restaurant[]>({
    queryKey: ['restaurants'],
    queryFn: getRestaurants,
  });
