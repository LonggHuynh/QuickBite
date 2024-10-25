import React, { useState } from 'react';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import EditRestaurantCard from '../EditRestaurantCard';
import { Box } from '@mui/material';
import useUserStore from '../../store/useUserStore';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { useGetRestaurantById } from '../../queries/useGetRestaurantById';
import { CardType } from '../../models/CardType';
import { useCartStore } from '../../store/useCartStore';

const Navbar = () => {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  const [editRestaurant, setEditRestaurant] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);

  const handleOpenSignupModal = () => setIsSignupModalOpen(true);
  const handleCloseSignupModal = () => setIsSignupModalOpen(false);
  const subtotal = useCartStore((state) => state.calculateSubtotal());

  const { data: restaurant } = useGetRestaurantById(user?.restaurant_id);
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="mb-25 z-[1] h-20 sticky top-0 bg-primary text-primaryOpposite flex px-10 justify-between">
      {editRestaurant && restaurant && (
        <EditRestaurantCard
          cardType={CardType.Create}
          closeTab={() => setEditRestaurant(false)}
          restaurant={restaurant}
        />
      )}

      <div className="logo flex items-center text-2xl font-semibold">
        <Link to="/main">QuickBite</Link>
      </div>
      <div className="cartAndMenu flex items-center gap-4">
        <Link
          to={user?.restaurant_id ? `/restaurants/${user?.restaurant_id}` : '#'}
          className="cart h-12 p-4 flex justify-between items-center border rounded-lg w-32"
          onClick={(e) => {
            if (!user?.restaurant_id) e.preventDefault();
          }}
        >
          <span>
            <ShoppingBasketIcon />
          </span>
          <span>${subtotal}</span>
        </Link>

        <div className="menu relative">
          <div
            className="menuButton h-12 p-4 flex items-center border w-12 rounded-lg justify-center cursor-pointer"
            onClick={() => setIsMenu((prev) => !prev)}
          >
            <MenuIcon />
          </div>

          {isMenu && (
            <Box
              className="menuBar absolute top-14 right-0 border rounded-lg w-40 flex flex-col bg-primaryOpposite text-primary drop-shadow-lg"
              sx={{
                zIndex: 1000,
              }}
            >
              {user ? (
                <>
                  <div className="p-4 border-b">{user.name}</div>
                  <Link to="/orders">
                    <div className="p-4 border-b cursor-pointer">My orders</div>
                  </Link>
                  {user.restaurant_id ? (
                    <Link
                      reloadDocument
                      to={`/restaurants/${user.restaurant_id}`}
                    >
                      <div className="p-4 border-b cursor-pointer">
                        My restaurant
                      </div>
                    </Link>
                  ) : (
                    <div
                      className="p-4 border-b cursor-pointer"
                      onClick={() => setEditRestaurant(true)}
                    >
                      Create restaurant
                    </div>
                  )}
                  <div
                    className="p-4 border-b cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="p-4 border-b cursor-pointer"
                    onClick={handleOpenLoginModal}
                  >
                    Login
                  </div>
                  <div
                    className="p-4 border-b cursor-pointer"
                    onClick={handleOpenSignupModal}
                  >
                    Sign Up
                  </div>
                </>
              )}
            </Box>
          )}
        </div>
      </div>

      <LoginModal open={isLoginModalOpen} onClose={handleCloseLoginModal} />

      <SignupModal open={isSignupModalOpen} onClose={handleCloseSignupModal} />
    </div>
  );
};

export default Navbar;
