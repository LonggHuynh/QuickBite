import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Order } from '../models/Order';
import api from '../api';

const createOrder = async (data: Order) => {
  const res = await api.post<Order>('/orders', data);
  return res.data;
};

export const useCreateOrder = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      client.setQueryData(
        ['orders'],
        (old: Order[] | undefined) => old?.concat(data) ?? [data]
      );
    },
  });
};
