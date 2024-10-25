import React from 'react';
import { useForm } from 'react-hook-form';
import ImageInput from './ImageInput';
import CloseIcon from '@mui/icons-material/Close';
import { Dish } from '../models/Dish';
import { CardType } from '../models/CardType';
import { useCreateDish } from '../queries/useCreateDish';
import { useEditDish } from '../queries/useEditDish';

interface EditDishProps {
  cardType: CardType;
  closeTab: () => void;
  dish?: Dish;
  categories?: string[];
  restaurant_id: string;
}

const EditDishCard = ({
  cardType,
  closeTab,
  dish,
  categories,
  restaurant_id,
}: EditDishProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Dish>({
    defaultValues: {
      ...dish,
    },
  });

  const [img, setImg] = React.useState(dish?.img);
  const { mutate: createDish } = useCreateDish(restaurant_id);
  const { mutate: editDish } = useEditDish(restaurant_id);

  const onSubmit = async (data: Dish) => {
    if (cardType === CardType.Create) {
      createDish(data);
    } else {
      editDish(data);
    }
    closeTab();
  };

  return (
    <div
      className="selectedItem fixed w-screen h-screen flex items-center justify-center z-[3] left-0 top-0 bg-primary bg-opacity-50 py-8"
      onClick={closeTab}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-[26vw] bg-white h-[90vh] flex flex-col rounded-sm text-primary"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute top-3 right-3 cursor-pointer"
          onClick={closeTab}
        >
          <CloseIcon />
        </div>

        <p className="mt-14 text-3xl text-center ">
          {cardType === CardType.Create ? 'Create Dish' : 'Edit Dish'}
        </p>

        <div className="px-4 mt-16 overflow-y-scroll scrollbar-w-[3px]">
          <div className="flex flex-col gap-10 mb-10">
            <input
              {...register('name', { required: 'Dish name is required' })}
              className="border-b text-2xl focus:outline-none"
              type="text"
              placeholder="Dish name"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}

            <div>
              <p>Background</p>

              <ImageInput
                image={img}
                setImage={(image: string) => {
                  setImg(image);
                  setValue('img', image);
                }}
                removeImage={() => {
                  setImg(undefined);
                  setValue('img', undefined);
                }}
              />
            </div>

            <div>
              <p>Description</p>
              <textarea
                {...register('description', {
                  required: 'Description is required',
                })}
                rows={5}
                placeholder="Enter dish description"
                className="border border-primary p-2 w-full"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div>
              <p>Price</p>
              <input
                {...register('price', {
                  required: 'Price is required',
                  min: { value: 0.01, message: 'Price must be greater than 0' },
                })}
                type="number"
                placeholder="Price"
                className="border-b w-full focus:outline-none"
                min="0.01"
                step="0.01"
              />
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div>
              <p>Category</p>
              <input
                {...register('category', { required: 'Category is required' })}
                type="text"
                list="categories"
                className="w-full border-b focus:outline-none px-2 py-1"
              />
              <datalist id="categories">
                {categories?.map((item, ind) => (
                  <option key={ind} value={item}>
                    {item}
                  </option>
                ))}
              </datalist>
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>
          </div>
        </div>

        <button className="mt-auto h-[10%] bg-primary text-primaryOpposite p-3 text-lg semi-bold">
          {cardType === CardType.Create ? 'Create' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default EditDishCard;
