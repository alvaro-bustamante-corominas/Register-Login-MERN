import './App.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from '../src/pages/Home'
import Register from '../src/pages/Register'
import Login from '../src/pages/Login'
import axios from 'axios';
import {Toaster} from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext';
import DashBoard from './pages/DashBoard'

//Endpoint for the backend
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
    <Navbar />
    <Toaster position='top-center' toastOptions={{duration: 2000}} />
    <Routes>
      <Route path='/' element={<Home />} ></Route>
      <Route path='/register' element={<Register />} ></Route>
      <Route path='/login' element={<Login />} ></Route>
      <Route path='/dashboard' element={<DashBoard />} ></Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App
