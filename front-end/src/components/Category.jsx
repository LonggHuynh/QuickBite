import React from 'react'
import DishCard from './DishCard'

const Category = ({ name, dishes }) => {


    return (
        <div className='mb-20'>
            <p className='text-2xl'>Breakfast</p>
            <div className="dishContainer mt-7 grid grid-cols-[repeat(4,1fr)] gap-y-5 gap-x-5">
                <DishCard />
                <DishCard />
                <DishCard />
                <DishCard />
                <DishCard />
                <DishCard />
                <DishCard />
                <DishCard />
                <DishCard />
            </div>

        </div>
    )
}

export default Category