import React from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useImageUpload } from '../queries/useUploadImage';

interface ImageInputProps {
  image: string | undefined;
  setImage: (url: string) => void;
  removeImage: () => void;
}

const ImageInput = ({ image, setImage, removeImage }: ImageInputProps) => {
  const { mutate: uploadImage, isPending, isError, error } = useImageUpload();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log('No file selected.');
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      alert('File size exceeds 1MB limit.');
      return;
    }

    uploadImage(file, {
      onSuccess: (imageUrl: string) => {
        setImage(imageUrl);
      },
      onError: (error) => {
        console.error('Error during upload:', error);
      },
    });
  };
  console.log(image);

  const deleteImage = () => {
    removeImage();
  };

  return (
    <div className="group flex justify-center items-center flex-col border border-primary w-full h-225 cursor-pointer">
      {!image ? (
        <>
          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              {isPending ? (
                <p className="text-primary">Uploading...</p>
              ) : (
                <>
                  <FileUploadIcon className="text-primary text-3xl" />
                  <p className="text-primary">Upload image (1MB)</p>
                </>
              )}
            </div>
            <input
              type="file"
              name="uploadimage"
              accept="image/*"
              onChange={handleImageChange}
              className="w-0 h-0"
            />
          </label>
          {isError && <p className="text-red-500">{error?.message}</p>}
        </>
      ) : (
        <div className="relative h-full">
          <img
            src={image ?? ''}
            alt="Uploaded Preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
            onClick={deleteImage}
          >
            <DeleteIcon className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageInput;
