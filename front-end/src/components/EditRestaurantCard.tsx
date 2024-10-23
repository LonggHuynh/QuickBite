import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ImageInput from "./ImageInput";
import CloseIcon from "@mui/icons-material/Close";

import { Restaurant } from "../models/Restaurant";
import { CardType } from "../models/CardType";
import { useCreateRestaurant } from "../queries/useCreateRestaurant";
import { useEditRestaurant } from "../queries/useEditRestaurant";
import { useGetRestaurants } from "../queries/useGetRestaurants";

interface EditRestaurantCardProps {
    cardType: CardType;
    restaurant?: Restaurant;
    closeTab: () => void;
}


const EditRestaurantCard = ({ cardType, restaurant, closeTab }: EditRestaurantCardProps) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Restaurant>({
        defaultValues: {
            ...restaurant
        }
    });

    const [background, setBackground] = React.useState(restaurant?.background_url);
    const [logo, setLogo] = React.useState(restaurant?.logo_url);


    const { mutate: creatRestaurant } = useCreateRestaurant();
    const { mutate: editRestaurant } = useEditRestaurant();

    const restaurants = useGetRestaurants().data;
    console.log(restaurants);
    const onSubmit: SubmitHandler<Restaurant> = (data) => {
        if (cardType === CardType.Create) {
            creatRestaurant(data);
        } else {
            editRestaurant(data);
        }
        closeTab();
    };

    return (
        <div
            className="selectedItem fixed w-screen h-screen flex items-center justify-center z-[1300] left-0 top-0 bg-primary bg-opacity-50 py-8"
            onClick={closeTab}
        >
            <div
                className="relative w-[26vw] bg-white h-[90vh] flex flex-col rounded-sm text-primary"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-3 right-3 cursor-pointer" onClick={closeTab}>
                    <CloseIcon />
                </div>

                <p className="mt-14 text-3xl text-center ">{cardType == CardType.Create ? "Create" : "Save"}</p>

                <div className="px-4 mt-16 overflow-y-scroll scrollbar-w-[3px]">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 mb-10">
                        <div>
                            <input
                                className="border-b text-2xl focus:outline-none"
                                placeholder="Restaurant name"
                                {...register("name", { required: "Restaurant name is required" })}
                            />
                            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                        </div>

                        <div className="backgroundInput">
                            <p>Background</p>
                            <ImageInput
                                image={background}
                                setImage={(image: string) => {
                                    setBackground(image);
                                    setValue("background_url", image);
                                }}
                                removeImage={() => {
                                    setBackground(undefined);
                                    setValue("background_url", undefined);
                                }}
                            />
                        </div>

                        <div className="logoInput">
                            <p>Logo</p>
                            <ImageInput
                                image={logo}
                                setImage={(image: string) => {
                                    setLogo(image);
                                    setValue("logo_url", image);
                                }}

                                removeImage={() => {
                                    setLogo(undefined);
                                    setValue("logo_url", undefined);
                                }}
                            />
                        </div>

                        <div className="logoInput">
                            <p>Min order</p>
                            <input
                                type="number"
                                className="border-b focus:outline-none w-full"
                                {...register("min_order", {
                                    required: "Minimum order is required",
                                    valueAsNumber: true,
                                })}
                            />
                            {errors.min_order && <span className="text-red-500">{errors.min_order.message}</span>}
                        </div>

                        <div className="logoInput">
                            <p>Delivery fee</p>
                            <input
                                type="number"
                                className="border-b focus:outline-none w-full"
                                {...register("delivery_fee", {
                                    required: "Delivery fee is required",
                                    valueAsNumber: true,
                                })}
                            />
                            {errors.delivery_fee && <span className="text-red-500">{errors.delivery_fee.message}</span>}
                        </div>

                        <button
                            type="submit"
                            className="mt-auto h-[10%] bg-primary text-primaryOpposite p-3 text-lg semi-bold"
                        >
                            {cardType == CardType.Create ? "Create" : "Save"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditRestaurantCard;
