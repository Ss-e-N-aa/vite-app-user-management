import './index.css'
import { Routes, Route } from 'react-router-dom'

import LogIn from './Components/LogIn'
import SignUp from './Components/SignUp'
import UsersList from './Components/UsersList'

import axios from "axios"
import { Toaster } from 'react-hot-toast';

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {

  return (
    <>
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path='/' element={<LogIn />}></Route>
        <Route path='signup' element={<SignUp />}></Route>
        <Route path='userslist' element={<UsersList />}></Route>
      </Routes>
    </>
  )
}

export default App
