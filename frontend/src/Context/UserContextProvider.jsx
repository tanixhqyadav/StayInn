import React, { useState } from 'react';
import UserContext from './UserContext';
import { useEffect } from 'react';
import axios from 'axios';

const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    if(!userInfo){
      const {data}= axios.get('/profile')
      .then( ({data})=>{
        setUserInfo(data);
      })    
    }
  }, []);
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
