import React from 'react';
import { Dish } from '../models/Dish';
interface DishCardProps {
  dish: Dish;
  selectItem: () => void;
}
const DishCard = ({ dish, selectItem }: DishCardProps) => {
  return (
    <div
      className=" flex flex-col h-[250px] bg-primaryOpposite cursor-pointer hover:bg-secondaryOpposite hover:border hover:drop-shadow-md "
      onClick={selectItem}
    >
      <div className="img bg-red-400 h-[180px]">
        <img src={dish.img} className="w-full h-full object-cover" alt=""></img>
      </div>
      <div className="details h-full py-2">
        <p className="text-lg">{dish.name}</p>
        <p className="text-sm font-light">${dish.price}</p>
      </div>
    </div>
  );
};

export default DishCard;
