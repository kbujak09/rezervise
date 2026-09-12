import defaultAvatar from '../../../assets/Nav/avatar-placeholder.jpg';
import { type ChangeEvent, useState } from "react";

export default function ProfilePictureEditor() {
  const [file, setFile] = useState<Blob | undefined>(undefined);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (file) {
      setFile(file);
    } else {
      setFile(undefined);
    }
  }

  const removeFile = () => setFile(undefined);

  return (
    <div className='w-fit py-5 px-7 box-border relative min-w-0'>
      <div className='text-center w-full box-border'>
        <div className='relative w-56 h-56 border-2 p-0.5 border-(--active-color) mb-5 overflow-hidden rounded-full'>
          <img
            alt='zdjęcie profilowe'
            src={ file ? `${URL.createObjectURL(file)}` : defaultAvatar }
            className={'w-full h-full object-cover rounded-full'}
          />
        </div>
        <div className='flex justify-center text-sm font-semibold'>
          {
            !file ?
              <label
                htmlFor='avatar-upload'
                className='border border-(--active-color) text-(--active-color)! cursor-pointer px-4 py-1.5 rounded-sm inline-block'
              >
                Wybierz plik
              </label>
              :
              <button
                className='px-4 py-1.5 border rounded-sm border-gray-500 bg-gray-200 text-black! cursor-pointer'
                onClick={removeFile}
              >
              Odrzuć zmiany
              </button>
          }
          <input
            type='file'
            id='avatar-upload'
            className='hidden'
            accept='.png, .jpg, .jpeg, .webp'
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  )
}