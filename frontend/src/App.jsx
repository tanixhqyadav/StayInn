import {Route,Routes} from 'react-router-dom'
import Header from './components/Header'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import Layout from './Layout'
import axios from 'axios'
import  UserContextProvider  from './Context/UserContextProvider'
import Account from './components/Account'
import IndexPage from './components/Header'
axios.defaults.baseURL='http://localhost:8080/api'
axios.defaults.withCredentials=true
function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path='/account' element={<Account/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App
