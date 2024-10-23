import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div
            className="w-full h-[calc(100vh-80px)] bg-cover"
            style={{
                backgroundImage: `url(${"/images/background.png"})`,
            }}
        >
            <div className="flex justify-evenly pt-16 items-center">
                <div className="left">
                    <p className="text-white text-2xl tracking-wider italic">
                        Are You Hungry?
                    </p>
                    <h1 className="text-white text-9xl">Don't Wait</h1>
                    <p className="text-orange-500 text-2xl italic">
                        Let's order food now
                    </p>
                    <Link to={"/main"}>
                        <button className="w-[200px] h-[70px] text-lg p-5 rounded-full border-2 border-white bg-transparent text-white mt-10 ">
                            Getting started
                        </button>
                    </Link>
                </div>

                <div
                    className="w-[440px] h-[440px] bg-cover rounded-[200px] flex justify-center items-center"
                    id="food"
                    style={{
                        backgroundImage: `url(${"/images/food.jpg"})`,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default Landing;
