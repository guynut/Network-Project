import { ReactNode } from 'react'

export default function MainLayout(props: { children: ReactNode }) {
  return (
    <div className='w-screen h-screen'>
      {props.children}
    </div>
  )
}
