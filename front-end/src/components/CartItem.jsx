import React from 'react'


const CartItem = ({ item }) => {

    return (
        <div className='flex items-center'>
            <div className="left">
                <p className='text-lg py-1'>McChicken</p>
                <p className='text-base'>$4.5</p>
            </div>

            <div className="right ml-auto">
                <div className="quantity flex   ">
                    <button className='h-10 w-10 border-4 rounded flex items-center justify-center'>-</button>
                    <div className='w-10 h-10 p-1 flex items-center justify-center text-xl'>6</div>
                    <button className='h-10 w-10 border-4 rounded flex items-center justify-center'>+</button>

                </div>


            </div>
        </div>
    )
}

export default CartItem