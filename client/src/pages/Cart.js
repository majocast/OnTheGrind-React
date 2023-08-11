import React, {useState, useEffect} from 'react';
import { Link } from'react-router-dom';

const Cart = () => {
  useEffect(() => {
    console.log('Cart useEffect');
  })

  return (
    <div>
      <h1>Cart</h1>
      <Link to="/">Go back to the homepage</Link>
    </div>
)
}

export default Cart;