import url from "../config/api";

const createDish = async (data, img, accessToken) => {
    const response = await fetch(url("/dishes"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ ...data, img: img }),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.msg);
    }

    return responseData;
};
const updateDish = async (data, img, accessToken) => {
    const response = await fetch(url("/dishes"), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ ...data, img: img }),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.msg);
    }

    return responseData;
};

const createRestaurant = async (data, background, logo, accessToken) => {
    const response = await fetch(url("/restaurants"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            ...data,
            background_url: background,
            logo_url: logo,
        }),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.msg);
    }

    return responseData;
};

const updateRestaurant = async (data, background, logo, accessToken) => {
    const response = await fetch(url("/restaurants"), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            ...data,
            background_url: background,
            logo_url: logo,
        }),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.msg);
    }

    return responseData;
};

export const getRestaurants = async () => {
    const response = await fetch(url("/restaurants"));
    if (!response.ok) {
        throw new Error(response.msg);
    }
    const data = await response.json();
    return data.data;
};

export const fetchRestaurantById = async (id) => {
    const response = await fetch(url(`/restaurants/${id}`));
    if (!response.ok) {
        throw new Error(response.msg);
    }
    const data = await response.json();
    return data.data;
};

export default {
    getRestaurants,
    createDish,
    updateDish,
    updateRestaurant,
    createRestaurant,

    fetchRestaurantById,
};
