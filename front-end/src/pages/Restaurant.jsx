import React from 'react'
import CartItem from '../components/CartItem'
import Category from '../components/Category'

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

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
                [...Array(5).keys()].map(val=>val+0.5<=rating?<StarIcon />:<StarBorderIcon />)
              }
              <span className='ml-1'> (500)</span>
              
            </div>
            <p className='text'>Min. $2.5  Delivery fee: $2.5</p>
          </div>

        </div>

        <div className="dishes px-10 py-20">
          <Category />
          <Category />
          <Category />
          <Category />
        </div>
      </div>
      <div className=' basket sticky top-20 bg-primaryOpposite grow-0 shrink-0 basis-[450px] px-9 pt-10 pb-20 flex flex-col h-[calc(100vh-80px)] drop-shadow-lg'>

        <p className='self-center text-4xl font-semibold'>Basket</p>
        <div className="itemsContainer flex flex-col gap-8">
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>

        <div className='flex mt-auto  text-lg'>
          <span >Dilivery cost </span>
          <span className='ml-auto'>$10</span>
        </div>

        <div className='flex mt-5 text-2xl font-medium'>
          <span>Total </span>
          <span className='ml-auto'>$10</span>
        </div>

        <button className='text-2xl mt-20  text-primaryOpposite bg-primary border rounded-lg p-4 '>Check out</button>

      </div>
    </div>
  )
}

export default Restaurant