import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
  const {user} = useSelector((state) => state.mhs)
  console.log(user.name)
  return (
    <div className='sticky top-0 '>
      <div className='flex justify-between items-center bg-slate-800 p-5 rounded-br-xl text-white'>
         <h1 className='text-2xl font-bold'>Welcome!</h1>
         <div>
            <p className='font-bold text-2xl'>{user.name}</p>
         </div>
      </div>
    </div>
  )
}

export default Header