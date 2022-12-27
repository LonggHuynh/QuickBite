import React from 'react'

const RestaurantCard = ({ deliveryTime, deliveryFee, rating }) => {
    return (
        <div className='flex w-[450px] h-[150px] bg-primaryOpposite hover:bg-secondaryOpposite hover:border hover:drop-shadow-md'>
            
            <div className='flex-[5] py-3 flex  flex-col'>
                <div>
                    <p className='text-lg'>Burger King</p>
                    <p className='text-xs'>$4.99 delivery</p>
                </div>
                <p className='mt-auto'>4.2</p>
            </div>

            <div className='image flex-[3]'>
                <div className='w-full h-full bg-red-400' ></div>

            </div>
        </div>
    )
}

export default RestaurantCard