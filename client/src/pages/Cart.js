import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from'react-router-dom';
import emptyCart from '../images/empty-cart.png';
import arabicaImage from '../images/products/arabica.jpg';
import bourbonImage from '../images/products/bourbon.jpg';
import excelsaImage from '../images/products/excelsa.jpg';
import frenchImage from '../images/products/frenchroast.jpg';
import geishaImage from '../images/products/geisha.jpg';
import libericaImage from '../images/products/liberica.jpg';
import robustaImage from '../images/products/robusta.jpg';
import typicaImage from '../images/products/typica.jpg';
import greenImage from '../images/products/green.jpg';
import herbalImage from '../images/products/herbal.jpg';
import whiteImage from '../images/products/white.jpg';
import roseImage from '../images/products/rose.jpg';

const Cart = () => {
  const [cart, setCart] = useState();

  async function pullCart() {
    try {
      const username = localStorage.getItem('username');
      const response = await axios.get(`http://localhost:3500/pullcart/${username}`);
      setCart(response.data[0]);
      console.log(response.data[0]);
    } catch (error) {
      alert('Error retrieving Cart information: ' + error.message);
    }
  }

  async function removeItem(e) {
    let value = e.target.value;
    try {
      console.log(value);
      const response = await axios.delete(`http://localhost:3500/removeitem/${value}`);
      if(response.data.status === 'item not found') {
        alert('error: item not found');
      } else {
        pullCart();
      }
    } catch (error) {
      alert('failed to remove item: ' + error.message);
    }
  }
  
  useEffect(() => {
    pullCart();
  }, []);

  if(!cart) {
    return <div>Loading cart...</div>
  } else if (cart.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <img src={emptyCart} alt='cart empty' />
        <h1 className='uppercase text-2xl font-bold py-4'>your cart is currently empty!</h1>
        <Link className='rounded-lg flex justify-center align-center p-1 cursor-pointer bg-[#47220f] text-white border-2 border-[#47220f] hover:bg-[#d8ccb6] hover:text-[#47220f]' to="/products">View Our Products!</Link>
        <Link className='rounded-lg flex justify-center align-center absolute top-2 left-2 p-1 cursor-pointer bg-[#47220f] text-white border-2 border-[#47220f] hover:bg-[#d8ccb6] hover:text-[#47220f]' to="/">Back to Home</Link>
      </div>
    )
  }

  console.log(cart);

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='uppercase text-5xl font-bold py-4'>Your Cart</h1>
      <Link className='rounded-lg flex justify-center align-center absolute top-2 left-2 p-1 cursor-pointer bg-[#47220f] text-white border-2 border-[#47220f] hover:bg-[#d8ccb6] hover:text-[#47220f]' to="/">Back to Home</Link>
      <div className='flex w-3/4 gap-4 justify-center items-center'>
        <div className='grid grid-rows-auto w-3/4 gap-2 border-2'>
          <div className='grid grid-cols-4 p-2'>
            <h1>Item Name</h1>
            <h1>Weight Selected</h1>
            <h1>Price Per Bag (USD)</h1>
          </div>
          {cart.map((product, index) => {
            return (
              <div className='grid grid-cols-4 p-2'>
                <h1 className='capitalize'>{product.item}</h1>
                <h1>{product.weight}</h1>
                <h1>{product.price}</h1>
                <button value={product._id} onClick={(e) => removeItem(e)}>remove</button>
              </div>
            )
          })}
        </div>
        <div className='flex flex-col border-l-2 border-[#47220f] border-r-2 border-[#47220f] w-1/4 justify-center items-center'>
          <h1>Total</h1>
        </div>
      </div>
    </div>
)
}

export default Cart;