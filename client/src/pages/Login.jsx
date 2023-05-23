import { useState } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import '../styles/form.css'

export default function Login() {
  const navigate = useNavigate()

  const [data, setData]= useState({
    email:'',
    password:'',
  })

  const loginUser = async (e) =>{
    e.preventDefault()
    const {email, password} = data

    try {
      const {data} = await axios.post('/login', {email, password});

      if(data.error){
        toast.error(data.error)
      } else{
        setData({});
        navigate('/dashboard')
      }
    } catch (error) {
      
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={loginUser}>
      <label> Login</label>
      <p></p>
        <input type='email' placeholder='Enter email...' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}  />
        <p></p>
        <input type='password' placeholder='Enter password... ' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}  />
        <p></p>
        <button type='submit'> Login</button>
      </form>
    </div>
  )
}
