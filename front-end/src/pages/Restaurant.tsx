import React, { useState } from 'react';
import Category from '../components/Category';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Basket from '../components/Basket';
import ItemModal from '../components/ItemModal';
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import EditRestaurantCard from '../components/EditRestaurantCard';
import EditDish from '../components/EditDishCard';
import useUserStore from '../store/useUserStore';
import { useGetRestaurantById } from '../queries/useGetRestaurantById';
import { useGetDishesByRestaurantId } from '../queries/useGetDishesByRestaurantId';
import { Dish } from '../models/Dish';
import { CardType } from '../models/CardType';

const Restaurant = () => {
  const { id } = useParams();
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [editRestaurant, setEditRestaurant] = useState(false);
  const [addDish, setAddDish] = useState(false);
  const user = useUserStore((state) => state.user);
  const uid = user?.id;

  const { data: restaurant, isLoading: isRestaurantLoading } =
    useGetRestaurantById(id);
  const { data: dishes, isLoading: isDishesLoading } =
    useGetDishesByRestaurantId(id!);
  const categorizedDishes = dishes
    ? Object.values(
        dishes.reduce(
          (acc: { [key: string]: typeof dishes }, dish) => {
            if (!dish || !dish.category) return acc;
            acc[dish.category] = acc[dish.category] ?? [];
            acc[dish.category].push(dish);
            return acc;
          },
          {} as { [key: string]: typeof dishes }
        )
      )
    : [];

  if (isRestaurantLoading || isDishesLoading) {
    return (
      <div className=" flex items-center justify-center h-screen">
        <ClipLoader />
      </div>
    );
  }

  return restaurant ? (
    <>
      {selectedDish && (
        <ItemModal
          dish={selectedDish}
          restaurant={restaurant}
          closeCard={() => setSelectedDish(null)}
        />
      )}
      {editRestaurant && (
        <EditRestaurantCard
          cardType={CardType.Edit}
          restaurant={restaurant}
          closeTab={() => setEditRestaurant(false)}
        />
      )}
      {addDish && (
        <EditDish
          cardType={CardType.Create}
          closeTab={() => setAddDish(false)}
          categories={[]}
          restaurant_id={restaurant.id}
        />
      )}
      <div className="flex">
        <div className="mainPage flex-1 basis-0 relative">
          <div className="backGround h-[400px] bg-primaryOpposite drop-shadow-lg">
            <div className="img bg-red-400 h-[60%] drop-shadow-md">
              <img
                src={restaurant.background_url}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="details px-10 py-5 flex flex-col h-[40%] relative">
              <div className="w-28 h-28 bg-white absolute -top-24 left-8">
                <img
                  className="w-full h-full object-cover"
                  alt=""
                  src={restaurant.logo_url}
                />
              </div>
              <div className="flex items-center">
                <p className="text-4xl font-semibold">{restaurant.name}</p>
                <div className="ml-auto cursor-pointer flex gap-3">
                  {uid === restaurant.owner_id && (
                    <>
                      <EditIcon onClick={() => setEditRestaurant(true)} />
                      <AddIcon onClick={() => setAddDish(true)} />
                    </>
                  )}
                </div>
              </div>

              <div className="flex mt-auto">
                {restaurant.rating ? (
                  <>
                    {[...Array(5).keys()].map((val) =>
                      val + 0.5 <= restaurant.rating ? (
                        <StarIcon key={val} />
                      ) : (
                        <StarBorderIcon key={val} />
                      )
                    )}
                    <span className="ml-1"> ({restaurant.order_count})</span>
                  </>
                ) : (
                  <p>Rating not available</p>
                )}
              </div>
              <p className="text">
                Min. ${restaurant.min_order}{' '}
                <span className="ml-3">
                  <DeliveryDiningIcon />.
                </span>{' '}
                ${restaurant.delivery_fee}
              </p>
            </div>
          </div>

          <div className="dishes px-10 py-20">
            {isDishesLoading ? (
              <div className="flex h-full  items-center justify-center">
                <ClipLoader />
              </div>
            ) : (
              categorizedDishes.map((item, ind) => (
                <Category
                  key={ind}
                  dishes={item}
                  selectItem={(item: Dish) => setSelectedDish(item)}
                />
              ))
            )}
          </div>
        </div>
        <Basket editable={true} />
      </div>
    </>
  ) : (
    <div className=" flex items-center justify-center h-screen">
      <ClipLoader />
    </div>
  );
};

export default Restaurant;
