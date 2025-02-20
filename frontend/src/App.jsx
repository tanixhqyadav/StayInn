import {Route,Routes} from 'react-router-dom'
import Header from './components/Header'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import Layout from './Layout'
import axios from 'axios'
import  UserContextProvider  from './Context/UserContextProvider'
import IndexPage from './components/IndexPage'
import PlacesFormPage from './components/PlacesFormPage'
import ProfilePage from './components/ProfilePage'
import SinglePage from './components/SinglePage'
import PlacesPage from './components/PlacesPage'
import BookingPage from './components/BookingPage'
import SingleBooking from './components/SingleBooking'
axios.defaults.baseURL='http://localhost:8000/api'
axios.defaults.withCredentials=true
function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index  element={<IndexPage/>}/>
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path='/account' element={<ProfilePage/>}/>
        <Route path='/account/places' element={<PlacesPage/>}/>
        <Route path="/account/places/new" element={<PlacesFormPage/>} />
        <Route path="/account/places/:id" element={<PlacesFormPage/>} />
        <Route path="/place/:id" element={<SinglePage/>} />  
        <Route path='/account/bookings' element={<BookingPage/>}/>
        <Route path='/account/bookings/:id' element={<SingleBooking/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App
