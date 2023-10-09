import React from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import MenuIcon from "@mui/icons-material/Menu";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../config/firebase.config";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { actionType } from "../redux/";
import EditRestaurantCard from "./EditRestaurantCard";
import { toast } from "react-toastify";
import authService from "../services/authService";

const firebaseAuth = getAuth(app);
const provider = new GoogleAuthProvider();

const Navbar = () => {
    const dispatch = useDispatch();

    const [editRestaurant, setEditRestaurant] = useState(false);

    const [isMenu, setIsMenu] = useState(false);
    const currentUser = useSelector((state) => state.user);

    const { restaurant, price } = useSelector((state) => state.cart);

    const login = async (user) => {
        const { uid, email, displayName, accessToken } = user;

        try {
            const userData = await authService.login(accessToken);
            dispatch({
                type: actionType.SET_USER,
                payload: {
                    uid,
                    email,
                    displayName,
                    accessToken,
                    hasRestaurant: userData.data.restaurant_id !== null,
                },
            });
            toast.success(userData.msg);
        } catch (error) {
            toast.error(error.message);
        }
    };
    const loginWithGUser = async () => {
        const { user } = await signInWithPopup(firebaseAuth, provider);
        await login(user);
    };

    const loginWithDummy = async () => {
        const user = {
            uid: "tzOVE3pENMW6pzmHrXpieeej8942",
            email: "dummy@mail.com",
            displayName: "Dummy",
            accessToken: "secret",
        };

        await login(user);
    };

    const signUp = async () => {
        const { user } = await signInWithPopup(firebaseAuth, provider);
        const { accessToken } = user;

        try {
            const userData = await authService.signup(accessToken);
            toast.success(userData.msg);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const logout = () => {
        sessionStorage.clear();
        window.location.replace("/");
    };

    return (
        <div className="mb-25 z-[1] h-20 sticky top-0 bg-primary text-primaryOpposite flex px-10   justify-between">
            {editRestaurant && (
                <EditRestaurantCard
                    action="Create"
                    closeTab={() => setEditRestaurant(false)}
                />
            )}

            <div className="logo flex items-center text-2xl font-semibold">
                <Link to="/main">QuickBite</Link>
            </div>
            <div className="cartAndMenu flex items-center gap-4">
                <Link
                    to={restaurant ? `/restaurants/${restaurant.id}` : ""}
                    className="cart h-12 p-4 flex justify-between items-center border rounded-lg w-32"
                    onClick={restaurant || ((event) => event.preventDefault())}
                >
                    <span>
                        <ShoppingBasketIcon />
                    </span>
                    <span>${price}</span>
                </Link>

                <div className="menu relative">
                    <div
                        className="menuButton  h-12 p-4 flex items-center border w-12 rounded-lg justify-center cursor-pointer"
                        onClick={() => setIsMenu((prev) => !prev)}
                    >
                        <MenuIcon />
                    </div>

                    {isMenu && (
                        <div className="menuBar absolute top-14 right-0 border rounded-lg w-40 right flex flex-col bg-primaryOpposite text-primary drop-shadow-lg">
                            {currentUser ? (
                                <>
                                    <div className="p-4 border-1 border-b">
                                        {currentUser.displayName}
                                    </div>
                                    <Link to="/orders">
                                        <div className="p-4 border-1 border-b cursor-pointer">
                                            My orders
                                        </div>
                                    </Link>
                                    {currentUser.hasRestaurant ? (
                                        <Link
                                            reloadDocument
                                            to={`/restaurants/${currentUser.uid}`}
                                        >
                                            {" "}
                                            <div className="p-4 border-1 border-b cursor-pointer">
                                                {" "}
                                                My restaurant
                                            </div>
                                        </Link>
                                    ) : (
                                        <div
                                            className="p-4 border-1 border-b cursor-pointer"
                                            onClick={() =>
                                                setEditRestaurant(true)
                                            }
                                        >
                                            Create restaurant
                                        </div>
                                    )}
                                    <div
                                        className="p-4 border-1 border-b cursor-pointer"
                                        onClick={logout}
                                    >
                                        Logout
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div
                                        className="p-4 border-1 border-b cursor-pointer"
                                        onClick={loginWithGUser}
                                    >
                                        Login
                                    </div>
                                    <div
                                        className="p-4 border-1 border-b cursor-pointer"
                                        onClick={signUp}
                                    >
                                        Sign Up
                                    </div>
                                    <div
                                        className="p-4 border-1 border-b cursor-pointer"
                                        onClick={loginWithDummy}
                                    >
                                        Login as dummy user
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
