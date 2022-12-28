import React from 'react'

import Category from '../components/Category'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Basket from '../components/Basket';
const Restaurant = () => {

  const rating = 4.5
  return (
    <div className='flex'>

      <div className="mainPage flex-1 basis-0">
        <div className='backGround h-[400px] bg-primaryOpposite drop-shadow-lg'>
          {/* Image */}
          <div className="img bg-red-400 h-[60%] drop-shadow-md"></div>
          <div className="details px-10 py-5 flex flex-col  h-[40%]" >
            <p className='text-4xl font-semibold'>Douwe Egberts Cafe</p>

            <div className='flex mt-auto'>

              {
                [...Array(5).keys()].map(val => val + 0.5 <= rating ? <StarIcon /> : <StarBorderIcon />)
              }
              <span className='ml-1'> (500)</span>

            </div>
            <p className='text'>Min. $2.5  <span className='ml-3'><DeliveryDiningIcon />.</span> $2.5</p>
          </div>

        </div>

        <div className="dishes px-10 py-20">
          <Category />
          <Category />
          <Category />
          <Category />
        </div>
      </div>
      <Basket editable={true} />
    </div>
  )
}

export default Restaurant