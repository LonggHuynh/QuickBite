import React from 'react'


const CartItem = ({ item, editable}) => {

    return (
        <div className='flex items-center'>
            <div className="left">
                <p className=' py-1'>McChicken</p>
                <p className='text-sm'>$4.5</p>
            </div>

            <div className="right ml-auto">
                <div className="quantity flex   ">
                    {editable&&<button className='h-5 w-5 border-4 rounded flex items-center justify-center'>-</button>}
                    <div className='w-5 h-5 p-1 flex items-center justify-center text-sm'>6</div>
                    {editable&&<button className='h-5 w-5 border-4 rounded flex items-center justify-center'>+</button>}

                </div>


            </div>
        </div>
    )
}

export default CartItem