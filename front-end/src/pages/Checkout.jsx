import React from 'react'
import Basket from '../components/Basket'
import "./Checkout.css"
const Checkout = () => {


    return (
        <div className='checkout flex w-full'>

            <div className='formContainer flex-1 px-20 py-32'>
                <form>

                    <div className="rounded-lg drop-shadow-lg bg-primaryOpposite px-10 py-14 flex flex-col">
                        <div className="flex  ">
                            <div className="flex-1 ">
                                <p className='text-3xl'>Address</p>
                                <div className='addressDetailsContainer flex flex-col gap-10 py-5 pr-14'>

                                    <input type="text" id="fname" name="firstname" placeholder="John M. Doe" className='border-b' />
                                    <input type="email" required id="email" name="email" placeholder="john@example.com" className='border-b' />
                                    <input type="text" id="adr" name="address" placeholder="542 W. 15th Street" className='border-b' />
                                    <input type="text" id="city" name="city" placeholder="New York" className='border-b' />

                                    <div className="flex  gap-5">
                                        <div className="flex-1">
                                            <input type="text" id="state" name="state" placeholder="NY" className='border-b' />
                                        </div>
                                        <div className="flex-1">
                                            <input type="text" id="zip" name="zip" placeholder="10001" className='border-b' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1">
                                <p className='text-3xl'>Card</p>
                                <div className='addressDetailsContainer flex flex-col gap-10 py-5 pr-10'>

                                    <input type="text" id="cname" name="cardname" placeholder="John More Doe" />
                                    <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" />
                                    <input type="text" id="expmonth" name="expmonth" placeholder="September" />

                                    <div className="flex">
                                        <div className="flex-1">
                                            <input type="text" id="expyear" name="expyear" placeholder="2018" />
                                        </div>
                                        <div className="flex-1">
                                            <input type="text" id="cvv" name="cvv" placeholder="352" />
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <button type='submit' className='ml-auto'>Submit</button>
                    </div>
                </form>
            </div>
            <Basket />
        </div>
    )
}

export default Checkout