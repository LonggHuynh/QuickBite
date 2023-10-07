import url from "../config/api";

const rateOrder = async (orderId, rating, accessToken) => {
    const response = await fetch(url(`/orders/${orderId}`), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ rating }),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.msg);
    }

    return responseData;
};

const submitOrder = async (order, accessToken) => {
    console.log(order);
    const path = accessToken ? "/orders" : "/orders/no-auth";
    const response = await fetch(url(path), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: accessToken ? `Bearer ${accessToken}` : null,
        },
        body: JSON.stringify(order),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.msg);
    }
    return data;
};
const fetchOrders = async (accessToken) => {
    const response = await fetch(url("/orders"), {
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.msg);
    }

    const ordersData = await response.json();
    const processedOrders = ordersData.map((order) => {
        const price = order.items
            .map((item) => item.quantity * item.price)
            .reduce((partialSum, a) => partialSum + a, 0);
        return { ...order, price };
    });

    return processedOrders;
};

export default {
    rateOrder,
    submitOrder,
    fetchOrders,
};
