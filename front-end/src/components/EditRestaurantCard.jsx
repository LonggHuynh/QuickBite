import React from "react";
import { useState } from "react";

import { useSelector } from "react-redux";
import ImageInput from "./ImageInput";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { actionType } from "../redux/";
import restaurantService from "../services/restaurantService";
const EditRestaurantCard = ({ action, restaurant, closeTab }) => {
    const [data, setData] = useState({
        name: restaurant?.name || "",
        delivery_cost: restaurant?.delivery_cost || 0,
        min_order: restaurant?.min_order || 0,
    });
    const [background, setBackground] = useState(restaurant?.background_url);
    const [logo, setLogo] = useState(restaurant?.logo_url);

    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (action === "Create") {
                await restaurantService.createRestaurant(
                    data,
                    background,
                    logo,
                    accessToken
                );
            } else {
                await restaurantService.updateRestaurant(
                    data,
                    background,
                    logo,
                    accessToken
                );
            }
            dispatch({ type: actionType.CREATE_RESTAURANT });
            window.location.reload();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleChange = (e) =>
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));

    return (
        <>
            <div
                className="selectedItem fixed w-screen h-screen flex items-center justify-center z-[1300] left-0 top-0 bg-primary bg-opacity-50 py-8"
                onClick={closeTab}
            >
                <div
                    className="relative w-[26vw] bg-white h-[90vh] flex flex-col rounded-sm text-primary"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        className="absolute top-3 right-3 cursor-pointer"
                        onClick={closeTab}
                    >
                        <CloseIcon />
                    </div>

                    <p className="mt-14 text-3xl text-center ">{action}</p>

                    <div className="px-4 mt-16 overflow-y-scroll scrollbar-w-[3px]">
                        <form className="flex flex-col gap-10 mb-10 ">
                            <input
                                className="border-b text-2xl focus:outline-none"
                                type="text"
                                placeholder="Restaurant name"
                                value={data.name}
                                name="name"
                                onChange={handleChange}
                            />

                            <div className="backgroundInput">
                                <p>Background</p>
                                <ImageInput
                                    image={background}
                                    setImage={setBackground}
                                />
                            </div>

                            <div className="logoInput">
                                <p>Logo</p>
                                <ImageInput image={logo} setImage={setLogo} />
                            </div>

                            <div className="logoInput">
                                <p>Min order</p>
                                <input
                                    type="number"
                                    onChange={handleChange}
                                    name="min_order"
                                    value={data.min_order}
                                    className="border-b focus:outline-none w-full"
                                />
                            </div>

                            <div className="logoInput">
                                <p>Delivery fee</p>
                                <input
                                    type="number"
                                    onChange={handleChange}
                                    name="delivery_cost"
                                    value={data.delivery_cost}
                                    className="w-full border-b focus:outline-none mb-10"
                                />
                            </div>
                        </form>
                    </div>

                    <button
                        className="mt-auto h-[10%] bg-primary text-primaryOpposite p-3 text-lg semi-bold"
                        onClick={handleSubmit}
                    >
                        {action}
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditRestaurantCard;
