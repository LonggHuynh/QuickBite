import React from 'react'

const DishCard = ({ price, title, description }) => {
    return (
        <div className=' flex flex-col h-[250px] bg-primaryOpposite hover:bg-secondaryOpposite hover:border hover:drop-shadow-md '>
            <div className='img bg-red-400 flex-[5]'></div>
            <div className='details flex-[3] py-2'>
                <p className='text-lg'>McChicken</p>
                <p className='text-sm font-light'>$10.92</p>
            </div>

        </div>
    )
}

export default DishCard