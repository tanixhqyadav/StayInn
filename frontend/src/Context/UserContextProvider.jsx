import React, { useState } from 'react';
import UserContext from './UserContext';
import { useEffect } from 'react';
import axios from 'axios';

const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if(!userInfo){
      const {data}= axios.get('/profile')
      .then( ({data})=>{
        setUserInfo(data);
        setReady(true);
      })    
    }
  }, []);
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo,ready }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
