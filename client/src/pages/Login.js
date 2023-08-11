import React, {useEffect, useState} from 'react';
import { Link } from'react-router-dom';

const Login = () => {
  useEffect(() => {
    console.log('Login');
  })
  console.log('Login');
  return (
    <div>
      <h1>Login</h1>
        <Link to="/">Go back to the homepage</Link>
      </div>
  );
}

export default Login;