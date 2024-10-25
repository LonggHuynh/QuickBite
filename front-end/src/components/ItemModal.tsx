import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import EditDish from './EditDishCard';
import CloseIcon from '@mui/icons-material/Close';
import { useCartStore } from '../store/useCartStore';
import useUserStore from '../store/useUserStore';
import { Dish } from '../models/Dish';
import { Restaurant } from '../models/Restaurant';
import { CardType } from '../models/CardType';
import ClipLoader from 'react-spinners/ClipLoader';
import { useGetRestaurantById } from '../queries/useGetRestaurantById';

interface ItemModalProps {
  dish: Dish;
  closeCard: () => void;
  restaurant: Restaurant;
}

const ItemModal = ({ dish, closeCard }: ItemModalProps) => {
  const user = useUserStore((state) => state.user);
  const [editDish, setEditDish] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const { data: restaurant } = useGetRestaurantById(dish.restaurant_id);

  if (!restaurant) {
    return (
      <div className=" flex items-center justify-center h-screen">
        <ClipLoader />
      </div>
    );
  }

  return (
    <>
      {editDish && (
        <EditDish
          cardType={CardType.Edit}
          dish={dish}
          closeTab={() => setEditDish(false)}
          categories={[]}
          restaurant_id={restaurant.id}
        />
      )}
      <div className="selectedItem fixed w-screen h-screen flex items-center justify-center z-[2] left-0 top-0 bg-primary bg-opacity-50 py-8">
        <div className="relative w-[26vw] bg-white h-[90vh] flex flex-col rounded-sm overflow-hidden">
          <div className="absolute right-3 top-4 flex gap-3">
            {user?.id === restaurant.owner_id && (
              <div className="bg-white rounded-full p-1">
                <EditIcon
                  onClick={() => setEditDish(true)}
                  className="cursor-pointer"
                />
              </div>
            )}
            <div className="bg-white rounded-full p-1">
              <CloseIcon onClick={closeCard} className="cursor-pointer" />
            </div>
          </div>
          <div className="imgContainer h-[35%] bg-red-700">
            <img className="h-full w-full object-cover" alt="" src={dish.img} />
          </div>

          <div className="px-5 flex-1">
            <p className="text-3xl font-semibold mt-10">{dish.name}</p>
            <p className="text-md mt-7">{dish.description}</p>
          </div>

          <button
            className="h-[10%] bg-primary text-primaryOpposite p-3 text-lg semi-bold"
            onClick={() => addToCart(dish, restaurant)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ItemModal;
