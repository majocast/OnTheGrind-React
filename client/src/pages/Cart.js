import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState();

  async function pullCart() {
    try {
      const username = localStorage.getItem('username');
      const response = await axios.get(`http://localhost:3500/pullcart/${username}`);
      setCart(response.data);
      console.log(response.data[0]);
    } catch (error) {
      alert('Error retrieving Cart information: ' + error.message);
    }
  }
  
  useEffect(() => {
    pullCart();
  }, [])

  return (
    <div>
      <h1>Cart</h1>
      <Link to="/">Go back to the homepage</Link>
    </div>
)
}

export default Cart;