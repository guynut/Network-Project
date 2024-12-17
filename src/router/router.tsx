import { Outlet, createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'

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
    path: '/home',
    element: (
      <MainLayout>
        <Home />
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
