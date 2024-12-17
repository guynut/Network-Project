import { Outlet, createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Login from '../pages/Login'
import Userprofile from '../pages/Userprofile'
import Summary from '../pages/Summary'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Login />
      </MainLayout>
    ),
  },
  {
    path: '/Summary',
    element: (
      <MainLayout>
        <Summary />
      </MainLayout>
    ),
  },
  {
    path: '/userprofile',
    element: (
      <MainLayout>
        <Userprofile />
      </MainLayout>
    ),
  },

  {
    path: '*',
    element: (
      <div className="w-screen h-screen text-6xl flex justify-center items-center bg-neutral-950 text-white font-bold">
        404 Not found
      </div>
    ),
  },
])
