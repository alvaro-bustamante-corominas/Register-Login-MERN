import { useState } from "react";
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../styles/form.css'

export default function Register() {
  const navigate = useNavigate()
  const [data, setData]= useState({
    name: '',
    email:'',
    password: '',
  })

  const registerUser = async (e) => {
    e.preventDefault();
    const {name, email, password} = data
    try{
      const{data} = await axios.post('/register', {name,email,password})
      if(data.error){
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Login successfull. Welcome!')
       // navigate('/login')
      }
    } catch(error){
      console.log(error)
    }
  }


  return (
    <div className="form-container">
      <form onSubmit={registerUser}>
        <label> Sign up</label>
        <p></p>
        <input type='text' placeholder='Enter name... ' required="" value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
        <p></p>
        <input type='email' placeholder='Enter email... ' required="" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
        <p></p>
        <input type='password' placeholder='Enter password... ' required="" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
        <p></p>
        <button type='submit'> Sign up</button>
      </form>
    </div>
  )
}
