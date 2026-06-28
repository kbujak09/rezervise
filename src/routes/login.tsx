import { createFileRoute } from '@tanstack/react-router';
import AuthForm from '../components/AuthForm.tsx';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className='h-dvh flex justify-center items-center'>
      <AuthForm/>
    </div>
  )
}