import url from "../config/api";

const signup = async (accessToken) => {
    const response = await fetch(url("/users"), {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const userData = await response.json();
    if (!response.ok) {
        throw new Error(userData.msg);
    }
    return userData;
};

const login = async (accessToken) => {
    const response = await fetch(url("/users"), {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const userData = await response.json();

    console.log(userData);
    if (!response.ok) {
        throw new Error(userData.msg);
    }
    return userData;
};

export default { login, signup };
