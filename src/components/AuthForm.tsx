import {useState} from "react";
import Input from "./Input.tsx";

export default function AuthForm() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div className='w-full max-w-120 sm:px-10 sm:py-15 sm:shadow-[0_8px_24px_rgba(0,0,0,0.15)] sm:border sm:border-[#eaeaea]'>
      <h2 className='text-center mb-14 text-xl sm:text-2xl text-slate-900'>
        Zaloguj się do panelu zarządzania
      </h2>
      <form className='grid gap-10'>
        <Input
          label='Login'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label='Hasło'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='bg-slate-900 text-white mt-4 py-3 px-10 rounded-[5px] mx-5 text-[1.125rem] cursor-pointer'>
          Zaloguj
        </button>
      </form>
    </div>
  )
}