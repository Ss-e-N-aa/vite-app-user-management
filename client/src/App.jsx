import './index.css'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import UsersList from './pages/UsersList'
import Dashboard from './pages/Dashboard'
import Update from './pages/Update'

import axios from "axios"
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './context/UserContext'
import { UsersListContextProvider } from './context/UsersListContext'


axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UsersListContextProvider>
      <UserContextProvider>
        <Toaster position='bottom-center' toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/userslist' element={<UsersList />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/users/:id' element={<Update />}></Route>
          <Route path='*' element={<h1 className='noPage'>Page not found.</h1>}></Route>
        </Routes>
      </UserContextProvider>
    </UsersListContextProvider>
  )
}

export default App
