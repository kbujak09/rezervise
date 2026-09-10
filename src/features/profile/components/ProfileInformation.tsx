import { type ChangeEvent, useState } from "react";

import polishFlag from '../../../assets/Profile/poland.png';

export default function ProfileInformation({user, register}: any) {
  const [displayName, setDisplayName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 9);
    setPhone(onlyDigits);
  }

  const handleDisplayNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  }

  return (
    <div className='p-5'>
      <div className='profile-data-container'>
        <label className='profile-data-label cursor-pointer' htmlFor="displayName">Wyświetlana Nazwa</label>
        <input
          id='displayName'
          {...register('displayName')}
          type="text"
          className='profile-data-input'
          onChange={handleDisplayNameChange}
        />
      </div>

      <div className='profile-data-container'>
        <label className='profile-data-label' htmlFor='email'>Adres Email</label>
        <input
          id='email'
          name='email'
          disabled
          value={user.email}
          type="text"
          className='profile-data-input text-gray-400 bg-gray-200'
        />
      </div>

      <div className='profile-data-container'>
        <label className='profile-data-label' htmlFor='password'>Hasło</label>
        <input
          id='password'
          name='password'
          disabled
          value={'***********'}
          type="text"
          className='profile-data-input text-gray-400 bg-gray-200'
        />
        <div className='pl-5 italic tracking-wide text-blue-500! cursor-pointer text-sm font-semibold'>
          Zmień hasło
        </div>
      </div>
      <div className='profile-data-container'>
        <label className='profile-data-label cursor-pointer' htmlFor='phoneNumber'>Numer Telefonu</label>
        <div className='flex justify-between gap-3'>
          <div className='flex items-center gap-2'>
            <img className='w-6 h-6 border rounded-full' src={polishFlag} alt="Polska"/>
            <div>+48</div>
          </div>
          <input
            id='phoneNumber'
            {...register('phoneNumber')}
            type='tel'
            inputMode='numeric'
            value={phone}
            className='profile-data-input [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none flex-1 w-fit'
            maxLength={9}
            onChange={handlePhoneChange}
          />
        </div>
      </div>
    </div>
  )
}