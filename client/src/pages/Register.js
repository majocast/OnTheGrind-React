import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from'react-router-dom';

function Register(){
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    console.log(email, password);
    try {
      //we are posting the data to the server + '/register'
      await axios.post('http://localhost:3500/register', {
        email, password
      })
      .then((res) => {
        if(res.data === 'exists') {
          //history('/', {state: {id: email}});
          alert('user has already registered');
        }
        else if(res.data === 'does not exist') {
          history('/', {state: {id: email}});
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
      <h1>Register</h1>
        <Link to="/">Go back to the homepage</Link>

        <form action='POST'>
          <input type='email' onChange={(e) => { setEmail(e.target.value) }} name='' id='' placeholder='Email'/>
          <input type='password' onChange={(e) => { setPassword(e.target.value) }} name='' id='' placeholder='Password'/>
          <input type='submit' onClick={submit}/>

        </form>
        <br/>
        <p>OR</p>
        <br/>

        <Link to='/login'>Login Page</Link>
      </div>
  );
}

export default Register;