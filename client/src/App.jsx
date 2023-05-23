import './App.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from '../src/pages/Home'
import Registration from '../src/pages/Registration'
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
      <Route path='/registration' element={<Registration />} ></Route>
      <Route path='/dashboard' element={<DashBoard />} ></Route>
    </Routes>
    </UserContextProvider>
    
  )
}

export default App
