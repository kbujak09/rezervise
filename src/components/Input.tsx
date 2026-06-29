import { useId } from 'react';

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input ({ label, type, value, onChange }: InputProps) {
  const uniqueId = useId();

  return (
    <div className='flex flex-col gap-2.5 box-border'>
      <label
        htmlFor={uniqueId}
        className='mx-7.5 font-light text-[1.125rem] text-slate-900'
      >
        {label}
      </label>
      <input
        id={uniqueId}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete='off'
        className='mx-5 p-2 text-[1.125rem] bg-gray-50 text-slate-900 border border-gray-400 rounded-md outline-slate-900 focus:outline-1'
      />
    </div>
  )
}