import React from 'react'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
const Navbar = () => {
    const [isMenu, setIsMenu] = useState(false)
    return (
        <div className='mb-25 z-50 h-20 sticky top-0 bg-primary text-primaryOpposite flex px-10   justify-between'>

            <div className="logo flex items-center text-3xl font-bold">Logo</div>
            <div className="cartAndMenu flex items-center gap-4">
                <div className="cart h-12 p-4 flex justify-between items-center border rounded-lg w-32">
                    <span><ShoppingBasketIcon /></span>
                    <span>$20</span>
                </div>

                <div className="menu relative">
                    <div className="menuButton  h-12 p-4 flex items-center border w-12 rounded-lg justify-center cursor-pointer" onClick={() => setIsMenu(prev => !prev)}>
                        <MenuIcon />
                    </div>

                    {
                        isMenu &&
                        (
                            <div className="menuBar absolute top-14 right-0 border rounded-lg w-40 right flex flex-col bg-primaryOpposite text-primary drop-shadow-lg">
                                <div className="p-4 border-1 border-b">Long Huynh</div>
                                <div className="p-4 border-1 border-b cursor-pointer">My orders</div>
                                <div className="p-4 border-1 border-b cursor-pointer">Sign out</div>
                            </div>
                        )
                    }


                    
                </div>

            </div>
        </div>
    )
}

export default Navbar