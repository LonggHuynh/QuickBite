import React, { useState } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import SearchIcon from '@mui/icons-material/Search';
import { Switch } from '@mui/material';
import { Link } from 'react-router-dom';

import { useGetRestaurants } from '../queries/useGetRestaurants';

const Main: React.FC = () => {
  const [isDeliveryFree, setIsDeliveryFree] = useState(false);
  const [minOrder, setMinOrder] = useState<number>(Infinity);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortTerm, setSortTerm] = useState<string>('');

  const { data: restaurants = [], error, isLoading } = useGetRestaurants();

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      searchTerm === '' ||
      ((!isDeliveryFree || restaurant.delivery_fee === 0) &&
        restaurant.min_order <= minOrder &&
        restaurant.rating >= minRating &&
        restaurant.name.toUpperCase().includes(searchTerm.toUpperCase()))
  );

  const sortedRestaurants =
    sortTerm == ''
      ? filteredRestaurants
      : filteredRestaurants.sort((a, b) => {
          const valueA = a[sortTerm];
          const valueB = b[sortTerm];

          if (typeof valueA === 'number' && typeof valueB === 'number') {
            return valueB - valueA;
          } else if (typeof valueA === 'string' && typeof valueB === 'string') {
            return valueB.localeCompare(valueA);
          }

          return 0;
        });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading restaurants</p>;

  return (
    <>
      <div className="mainContainer flex">
        <div className="sideBar bg-primaryOpposite flex-1 px-10 py-14 sticky top-20 flex flex-col gap-10 drop-shadow-lg  h-[calc(100vh-80px)]">
          <p className="text-xl ">{restaurants.length} restaurants</p>

          <div className="filterItem mt-6">
            <p className="text-2xl ">Free Delivery</p>
            <Switch
              checked={isDeliveryFree}
              onChange={() => setIsDeliveryFree((prev) => !prev)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>

          <fieldset id="minOrder">
            <p className="text-2xl mb-3 ">Min Order</p>
            <div className="inputItem mb-2">
              <input
                type="radio"
                id="10"
                value={10}
                name="minOrder"
                onChange={(e) => setMinOrder(Number(e.target.value))}
              />
              <label className="ml-3" htmlFor="10">
                $10
              </label>
            </div>

            <div className="inputItem mb-2">
              <input
                type="radio"
                id="20"
                value={20}
                name="minOrder"
                onChange={(e) => setMinOrder(Number(e.target.value))}
              />
              <label className="ml-3" htmlFor="20">
                $20
              </label>
            </div>

            <div className="inputItem mb-2">
              <input
                type="radio"
                id="all"
                value={Infinity}
                name="minOrder"
                onChange={(e) => setMinOrder(Number(e.target.value))}
              />
              <label className="ml-3" htmlFor="all">
                All
              </label>
            </div>
          </fieldset>

          <fieldset id="minRating">
            <p className="text-2xl mb-3 ">Rating</p>

            {Array.from(Array(5).keys()).map((val) => (
              <div className="inputItem mb-2" key={val}>
                <input
                  type="radio"
                  id={`rating-${val + 1}`}
                  value={val + 1}
                  name="minRating"
                  onChange={(e) => setMinRating(Number(e.target.value))}
                />
                <label className="ml-2" htmlFor={`rating-${val + 1}`}>
                  {val + 1}
                </label>
              </div>
            ))}

            <div className="inputItem mb-2">
              <input
                type="radio"
                id="rating-all"
                value={0}
                name="minRating"
                onChange={(e) => setMinRating(Number(e.target.value))}
              />
              <label className="ml-2" htmlFor="rating-all">
                All
              </label>
            </div>
          </fieldset>
        </div>

        <div className="list flex-[7]  py-14 pl-16 pr-20 min-h-screen">
          <div className="w-full h-60 ">
            <img
              className="w-full h-full object-cover object-center"
              alt=""
              src={'/images/main_food.jpg'}
            />
          </div>
          <div className="searchAndSort flex gap-10 mt-20">
            <div className="searchBar border-2 rounded px-4 py-2 flex gap-3 items-center flex-[2]">
              <p>
                <SearchIcon />
              </p>
              <input
                type="text"
                className="w-full p-2 text-lg border-none focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="sort flex-1 border-2 rounded">
              <select
                className="outline-none w-full bg-white p-4 cursor-pointer"
                value={sortTerm}
                onChange={(e) => setSortTerm(e.target.value)}
              >
                <option value="" className="bg-white">
                  --
                </option>

                <option value="order_count" className="bg-white">
                  Popularity
                </option>
                <option value="rating" className="bg-white">
                  Highest rating
                </option>
              </select>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-xl">{sortedRestaurants.length} restaurants</p>
          </div>
          <div className="cardGrid flex flex-wrap gap-x-52 gap-y-10 mt-5">
            {sortedRestaurants.map((item) => (
              <Link
                key={item.id}
                to={`/restaurants/${item.id}`}
                state={{ restaurant: item }}
              >
                <RestaurantCard restaurant={item} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
