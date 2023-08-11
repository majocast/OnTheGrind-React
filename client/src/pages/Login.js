import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from'react-router-dom';

function Login (){
  const history = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    console.log(email, password);
    try {
      //we are posting the data to the server + '/login'
      await axios.post('http://localhost:3500/login', {
        email, password
      })
      .then((res) => {
        if(res.data === 'exists') {
          history('/', {state: {id: email}});
        }
        else if(res.data === 'does not exist') {
          alert('user has not registered');
        }
      })
      .catch((error) => {
        alert('wrong details');
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log('Login');
  })
  console.log('Login');
  return (
    <div>
      <h1>Login</h1>
        <Link to="/">Go back to the homepage</Link>

        <form action='POST'>
          <input type='email' onChange={(e) => { setEmail(e.target.value) }} name='' id='' placeholder='Email'/>
          <input type='password' onChange={(e) => { setPassword(e.target.value) }} name='' id='' placeholder='Password'/>
          <input type='submit' onClick={submit}/>

        </form>
        <br/>
        <p>OR</p>
        <br/>

        <Link to='/register'>Register</Link>
      </div>
  );
}

export default Login;