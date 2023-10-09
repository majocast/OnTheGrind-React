import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from'react-router-dom';
import Logo from '../images/logo.png';

function Login() {
  const history = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    console.log(`${process.env.REACT_APP_OTG_SERVER}`);
    e.preventDefault();
    try {
      console.log(email);
      console.log(password);
      //we are getting the data to the server + '/login'
      await axios.get(`${process.env.REACT_APP_OTG_SERVER}/login/${email}/${password}`)
      .then((res) => {
        if(res.data.status === 200) {
          localStorage.setItem('username', res.data.username);
          history('/');
        }
        else if(res.status === 401) {
          alert('email or password is incorrect');
          history('/login');
        }
        else if(res.data === 'does not exist') {
          alert('user has not registered');
          history('/register');
        }
      })
      .catch((error) => {
        alert('ERROR');
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <Link className='rounded-lg flex justify-center align-center absolute top-2 left-2 p-1 cursor-pointer bg-[#47220f] text-white border-2 border-[#47220f] hover:bg-[#d8ccb6] hover:text-[#47220f]' to="/">Back to Home</Link>
      <img src={Logo} alt='logo' className='w-96'/>
      <div className='rounded-2xl border-4 border-[#47220f] flex flex-col items-center justify-center bg-white p-8 my-4 drop-shadow-lg animate-rise'>
        <h1 className='text-3xl font-bold py-2'>Login</h1>
        <form action='POST' className='flex flex-col gap-4 drop-shadow-lg py-2'>
          <input className='rounded-lg px-2 py-1' type='email' onChange={(e) => { setEmail(e.target.value) }} name='' id='' placeholder='Email'/>
          <input className='rounded-lg px-2 py-1' type='password' onChange={(e) => { setPassword(e.target.value) }} name='' id='' placeholder='Password'/>
          <button className='h-auto rounded-lg py-1 cursor-pointer bg-[#47220f] text-white hover:bg-[#d8ccb6] hover:text-[#47220f]' type='submit' onClick={submit}>Log In</button>
        </form>
        <p className='py-2 font-bold'>OR</p>
        <Link className='w-full text-center h-auto rounded-lg py-1 mt-1 cursor-pointer bg-[#47220f] text-white hover:bg-[#d8ccb6] hover:text-[#47220f]' to='/register'>Register</Link>
      </div>
    </div>
  );
}

export default Login;