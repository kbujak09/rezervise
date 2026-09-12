import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import Nav from '../components/layouts/panel/Nav';
import Header from '../components/layouts/panel/Header';

export const Route = createFileRoute('/panel')({
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: '/logowanie'
      })
    }

    if (location.pathname === '/panel') {
      throw redirect({
        to: '/panel/kalendarz'
      })
    }
  },
  component: PanelLayout
})

function PanelLayout() {
  return (
    <div className='flex bg-[#e9e9e9] w-full h-dvh'>
      <Nav/>
      <div className='flex flex-col w-full'>
        <Header/>
        <div className='flex flex-col m-4 h-full'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}