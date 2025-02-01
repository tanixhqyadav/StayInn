import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../Context/UserContext.js'

function IndexPage() {
  const {userInfo} =useContext(UserContext);

  return (
    <>
      <div>
        <header className=" flex justify-between" >
          <Link to={'/'} href="" className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-6 -rotate-90">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
            <span className="font-bold text-xl" >airbnb</span>
          </Link>
          <div className="flex gap-4  border-gray-300 border-2 rounded-full py-2 px-4 shadow-md">
              <div>Anywhere</div>
              <div className="border-l border-gray-300"></div>
              <div>Any week</div>
              <div className="border-l border-gray-300"></div>
              <div>Any guests</div>
              <button className="bg-primary text-white rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            </button>
          </div>
          <Link to={ userInfo?'/account':'/login'} className="flex gap-4 items-center border-gray-300 border-2 rounded-full py-2 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
            {!!userInfo &&(
              <div>
                {userInfo.name}
              </div>
            )}
          </Link>
        </header>
      </div>
    </>
  )
}

export default IndexPage