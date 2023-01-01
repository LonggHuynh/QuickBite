import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

const ItemModal = ({ selectedItem }) => {
    return (
        <>{
            selectedItem && (
                <div className='fixed w-screen h-screen flex items-center justify-center z-[1300] left-0 top-0 bg-primary bg-opacity-50 py-8'>
                    <div className='relative w-[545px] bg-red-500 h-full mt-8 mb-8 flex flex-col'>

                        <div className="absolute right-3 top-4">
                            <CloseIcon fontSize="large" />
                        </div>
                        <div className='flex-1'>
                            <div className="imgContainer h-300 bg-red-700">

                            </div>
                        </div>
                        <div className='basis-36 bg-slate-300 grow-0 shrink-0 '></div>


                    </div>




                </div>
            )
        }
        </>
    )
}

export default ItemModal