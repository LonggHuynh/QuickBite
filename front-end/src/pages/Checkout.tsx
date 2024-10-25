import React from 'react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import Basket from '../components/Basket';
import ClipLoader from 'react-spinners/ClipLoader';
import { useCartStore } from '../store/useCartStore';
import useUserStore from '../store/useUserStore';
import { Order } from '../models/Order';
import './Checkout.css';
import { useCreateOrder } from '../queries/useCreateOrder';
import { useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  address: string;
  email: string;
  postcode: string;
  city: string;
  cardname: string;
  cardnumber: string;
  expmonth: string;
  expyear: string;
  cvv: string;
}

const Checkout = () => {
  const user = useUserStore((state) => state.user);
  const items = useCartStore((state) => state.items);
  const restaurant = useCartStore((state) => state.restaurant);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      address: '',
      postcode: '',
      city: '',
      cardname: '',
      cardnumber: '',
      expmonth: '',
      expyear: '',
      cvv: '',
    },
  });

  const calculateTotal = useCartStore((state) => state.calculateTotal);
  const { mutate: createOrder, isPending: isCreatingOrder } = useCreateOrder();
  const onSubmit = (data: FormData) => {
    const order: Order = {
      itemDetails: items,
      restaurant_id: restaurant?.id,
      amount_paid: calculateTotal(),
      address: `${data.address}, ${data.postcode}, ${data.city}`,
      date: new Date().toISOString(),
      name: data.name,
      email: data.email,
    };

    createOrder(order, {
      onSuccess: () => {
        navigate(user ? '/orders' : '/main');
      },
    });
  };

  return (
    <>
      {isCreatingOrder ? (
        <div className="flex items-center justify-center h-screen">
          <ClipLoader />
        </div>
      ) : (
        <div className="checkout flex w-full">
          <div className="formContainer flex-1 px-20 py-24">
            <p className="mb-10 text-4xl">Check out</p>

            <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
              <div className="rounded-lg drop-shadow-lg border px-10 py-14 flex flex-col">
                <div className="flex">
                  <div className="flex-1">
                    <p className="text-2xl">Address</p>
                    <div className="addressDetailsContainer flex flex-col gap-10 py-5 pr-14 mt-2">
                      <input
                        type="text"
                        placeholder="Name"
                        className="border-b"
                        {...register('name', { required: true })}
                      />
                      {errors.name && <span>This field is required</span>}

                      <input
                        type="email"
                        placeholder="Email"
                        className="border-b"
                        {...register('email', { required: true })}
                      />
                      {errors.email && <span>This field is required</span>}

                      <input
                        type="text"
                        placeholder="Address"
                        className="border-b"
                        {...register('address', { required: true })}
                      />
                      {errors.address && <span>This field is required</span>}

                      <div className="flex gap-5">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Post code"
                            className="border-b"
                            {...register('postcode', { required: true })}
                          />
                          {errors.postcode && (
                            <span>This field is required</span>
                          )}
                        </div>

                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="City"
                            className="border-b"
                            {...register('city', { required: true })}
                          />
                          {errors.city && <span>This field is required</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-2xl">Card</p>
                    <div className="addressDetailsContainer flex flex-col gap-10 py-5 pr-10 mt-2">
                      <input
                        type="text"
                        placeholder="Card holder name (No need to fill)"
                        {...register('cardname')}
                      />
                      <input
                        type="text"
                        placeholder="Card number (No need to fill)"
                        {...register('cardnumber')}
                      />
                      <input
                        type="text"
                        placeholder="Expiry month (No need to fill)"
                        {...register('expmonth')}
                      />

                      <div className="flex gap-5">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Expiry year (No need to fill)"
                            {...register('expyear')}
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="CVV (No need to fill)"
                            {...register('cvv')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="ml-auto bg-primary text-white px-4 py-2 rounded-lg mt-7 text-lg"
                >
                  Complete order
                </button>
              </div>
            </form>
          </div>
          <Basket editable={false} />
        </div>
      )}
    </>
  );
};

export default Checkout;
