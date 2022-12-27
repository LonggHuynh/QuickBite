import React from 'react'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import MenuIcon from '@mui/icons-material/Menu';
const Navbar = () => {
    return (
        <div className='mb-25 z-50 h-20 sticky top-0 bg-primary text-primaryOpposite flex px-10   justify-between'>

            <div className="logo flex items-center text-3xl font-bold">Logo</div>
            <div className="cartAndMenu flex items-center gap-4">
                <div className="cart h-12 p-4 flex justify-between items-center border-2 rounded-lg w-32">
                    <span><ShoppingBasketIcon /></span>
                    <span>$20</span>
                </div>
                <div className="cart h-12 p-4 flex items-center border w-12 rounded-lg justify-center "><MenuIcon/></div>
            </div>
        </div>
    )
}

export default Navbar