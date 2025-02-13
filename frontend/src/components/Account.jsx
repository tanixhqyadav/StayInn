import React, { useContext , useState} from 'react'
import  UserContext  from '../Context/UserContext'
import { Navigate ,Link , useParams } from 'react-router-dom'
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from '../utils/AccountNav';

function Account() {
  const [reDirect,setReDirect]=useState(false);
  const {ready,userInfo, setUserInfo}=useContext(UserContext);
  let {subpage}=useParams();
  if(subpage===undefined){
      subpage='profile';
  }
    async function LogOut(){
      await axios.post('/logout');
      setReDirect(true);
      setUserInfo(null);
    }
  if(ready && !userInfo && !reDirect){
    return <Navigate to={'/login'}/>
  }
  if(!ready){
    return 'Loading...'
  }
  if(reDirect){
    return <Navigate to='/'/>
  }
  return (
    <div>
      <AccountNav/>
      {subpage==='profile' && (
        <div className='text-center mt-8 max-w-lg mx-auto'>
          Logged in as {userInfo.name} ({userInfo.email}) <br />
          <button onClick={LogOut} className='primary max-w-sm mt-2' >Logout</button>
        </div>
      )}
      {subpage==='places' && (
        <PlacesPage/>
      )}
    </div>
  )
} 

export default Account