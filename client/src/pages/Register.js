import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from'react-router-dom';
import Logo from '../images/logo.png';

function Register() {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    console.log(email, password, username);
    if(password === verifyPassword) {
      try {
        //we are posting the data to the server + '/register'
        await axios.post(`${process.env.OTG_Server}/register`, {
          email, password, username
        })
        .then((res) => {
          if(res.data === 'exists') {
            alert('username or email has already registered');
            history('/login');
          }
          else if(res.data === 'does not exist') {
            localStorage.setItem('username', username);
            history('/');
          }
        })
        .catch((error) => {
          alert('wrong details');
          console.log(error);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('passwords do not match');
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <Link className='rounded-lg flex justify-center align-center absolute top-2 left-2 p-1 cursor-pointer bg-[#47220f] text-white border-2 border-[#47220f] hover:bg-[#d8ccb6] hover:text-[#47220f]' to="/">Back to Home</Link>
      <img src={Logo} alt='logo' className='w-96'/>
      <div className='rounded-2xl border-4 border-[#47220f] flex flex-col items-center justify-center bg-white p-8 my-4 drop-shadow-lg'>
        <h1 className='text-3xl font-bold py-2'>Register</h1>
        <form action='POST' className='flex flex-col gap-4 drop-shadow-lg py-2'>
          <input className='rounded-lg px-2 py-1' type='text' onChange={(e) => { setUsername(e.target.value) }} placeholder='Username' required/>
          <input className='rounded-lg px-2 py-1' type='email' onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' required/>
          <input className='rounded-lg px-2 py-1' type='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' required/>
          <input className='rounded-lg px-2 py-1' type='password' onChange={(e) => { setVerifyPassword(e.target.value) }} placeholder='Verify Password' required/>
          <button className='h-auto rounded-lg py-1 cursor-pointer bg-[#47220f] text-white hover:bg-[#d8ccb6] hover:text-[#47220f]' type='submit' onClick={submit}>Register</button>
        </form>
        <p className='py-2 font-bold'>OR</p>
        <Link className='w-full text-center h-auto rounded-lg py-1 mt-1 cursor-pointer bg-[#47220f] text-white hover:bg-[#d8ccb6] hover:text-[#47220f]' to='/login'>Login</Link>
      </div>
    </div>
  );
}

export default Register;