import React from "react";
import DishCard from "./DishCard";
import { Dish } from "../models/Dish";
import { Item } from "../models/Item";


interface CategoryProps {
    dishes: Dish[];
    selectItem: (item: Dish) => void;
}
const Category = ({ dishes, selectItem }: CategoryProps) => {
    return (
        <div className="mb-20">
            <p className="text-2xl">{dishes[0].category || `Others`}</p>
            <div className="dishContainer mt-7 grid grid-cols-[repeat(4,1fr)] gap-y-5 gap-x-5">
                {dishes.map((item) => (
                    <DishCard
                        key={item.id}
                        dish={item}
                        selectItem={() => selectItem(item)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Category;
