import { useQuery } from '@tanstack/react-query';
import api from '../api';
import { Order } from '../models/Order';

const getOrders = async (): Promise<Order[]> => {
  const res = await api.get<Order[]>('/orders');
  return res.data;
};

export const useGetOrders = () =>
  useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: getOrders,
  });
