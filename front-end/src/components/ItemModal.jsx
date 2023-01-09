import React from 'react'
import { useState } from 'react';
import { useDispatch } from "react-redux"
import { actionType } from '../redux'
import EditIcon from '@mui/icons-material/Edit';
import EditDish from './EditDish';
import CloseIcon from '@mui/icons-material/Close';
const ItemModal = ({ dish, close, restaurant, categories }) => {


    const dispatch = useDispatch()


    const [editDish, setEditDish] = useState(false)
    const addToCartActionCreator = () => {

        return (dispatch) => {
            dispatch({ type: actionType.ADD_TO_CART, payload: { ...dish, quantity: 1 } })
            dispatch({ type: actionType.SET_RESTAURANT, payload: restaurant })

        }
    }

    return (
        <>
            {editDish && <EditDish action='Edit' dish={dish} categories={categories} closeTab={() => setEditDish(false)} />}
            <div className='selectedItem fixed w-screen h-screen flex items-center justify-center z-[2] left-0 top-0 bg-primary bg-opacity-50 py-8' >
                <div className='relative w-[26vw] bg-white h-[90vh] flex flex-col rounded-sm overflow-hidden' >

                    <div className="absolute right-3 top-4 flex gap-3">
                        <EditIcon onClick={() => setEditDish(true)} />
                        <CloseIcon onClick={close} />
                    </div>
                    <div className="imgContainer h-[35%] bg-red-700">
                        <img className='h-full w-full object-cover' src={dish.img} />
                    </div>


                    <div className='px-5 flex-1'>
                        <p className='text-3xl font-semibold mt-10'>{dish.name}</p>
                        <p className='text-md mt-7'>{dish.description}</p>
                    </div>






                    <button className='h-[10%] bg-primary text-primaryOpposite p-3 text-lg semi-bold' onClick={() => dispatch(addToCartActionCreator())}>
                        Add to cart
                    </button>



                </div>




            </div>


        </>
    )
}

export default ItemModal