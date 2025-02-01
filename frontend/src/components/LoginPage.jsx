import axios from 'axios';
import React from 'react'
import {useContext, useState} from "react";
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../Context/UserContext.js';


function LoginPage() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false);
  const {setUserInfo}=useContext(UserContext);
  async function loginUser(ev){
    ev.preventDefault();
    try{
    const userInfo=await axios.post('/login',{email,password});
    alert('User logged in successfully');
    setUserInfo(userInfo.data);
    setRedirect(true);
    }
    catch(err){
      return alert('Login failed. Please try again');
    }
  }
  if(redirect){
    return <Navigate to={'/'} />
  }
  
  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
      <h1 className='text-4xl text-center mb-4'>Login</h1>
      <form className='max-w-md mx-auto' onSubmit={loginUser}>
        <input type="email"  placeholder='your@email.com' 
            value={email} 
            onChange={ ev => setEmail(ev.target.value)}/>
        <input type="password"  
          placeholder='password'
          value={password}
          onChange={ ev => setPassword(ev.target.value) }
        />
        <button className='primary' >Login</button>
        <div className='text-center py-2 text-gray-500'>
          Don't have an account yet? 
          <Link className='underline text-black' to={'/register'}>Register</Link></div>
      </form>
      </div>
    </div>
  )
}

export default LoginPage