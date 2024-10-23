
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Order } from '../models/Order';


const rateOrder = async (data: Order) => {
    return data;
}

export const useRateOrder = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: rateOrder,
        onSuccess: (data) => {
            client.setQueryData(['orders'], (old: Order[] | undefined) => old?.map(order => order.id == data.id ? data : order) ?? [data]);
        }
    });
};

