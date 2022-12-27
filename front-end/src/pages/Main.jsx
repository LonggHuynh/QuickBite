import React from 'react'
import RestaurantCard from '../components/RestaurantCard'
import SearchIcon from '@mui/icons-material/Search';
const Main = () => {
    return (
        <div className='mainContainer flex'>
            <div className="sideBar bg-secondary flex-1 px-10 py-14 sticky top-9 h-full flex flex-col gap-10">
                <p className='text-2xl font-semibold'>752 restaurants</p>
                <div className='filterItem'>
                    <p className='text-2xl mb-3 font-semibold'>Min Order</p>
                    <div className='inputItem mb-2'>
                        <input type='radio' id='10' value="10" name='price' />
                        <label className='ml-3' htmlFor='asc'> $10</label>
                    </div>

                    <div className='inputItem mb-2' >
                        <input type='radio' id='20' value="20" name='price' />
                        <label className='ml-3' htmlFor='desc'> $20 </label>
                    </div>

                    <div className='inputItem mb-2' >
                        <input type='radio' id='all' value="0" name='price' />
                        <label className='ml-3' htmlFor='all'> All</label>
                    </div>
                </div>


                <div className='filterItem'>
                    <p className='text-2xl mb-3 font-semibold'>Rating</p>

                </div>
            </div>


            <div className="list flex-[5]  py-14 pl-14 pr-32 min-h-screen">
                <div className="searchAndSort flex gap-10">
                    <div className='searchBar border-2 rounded px-4 py-2 flex gap-3 items-center flex-[2]'>
                        <p>
                            <SearchIcon />
                        </p>
                        <input type='text' className='w-full p-2 text-lg border-none focus:outline-none' />
                    </div>

                    <div className='sort flex-1 border-2 rounded'>
                        <select
                            className="outline-none w-full bg-white p-4 cursor-pointer"
                        >
                            <option value="other"  className="bg-white">
                                Highest rating
                            </option>
                        </select>

                    </div>
                </div>

                <div className='mt-5'>
                    <p className='text-2xl font-semibold'>752 restaurants</p>
                </div>
                <div className="cardGrid grid grid-cols-2 gap-12 mt-10">
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                    <RestaurantCard />
                </div>
            </div>
        </div>
    )
}

export default Main