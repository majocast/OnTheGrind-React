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

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  async function pullCart() {
    try {
      const username = localStorage.getItem('username');
      if(username) {
        const response = await axios.get(`${process.env.REACT_APP_OTG_SERVER}/pullcart/${username}`);
        setCart(response.data[0]);
      }
    } catch (error) {
      alert('Error retrieving Cart information: ' + error.message);
    }
  }

  useEffect(() => {
    let newTotal = 0;
    for(let i = 0; i < cart.length; i++) {
      newTotal = parseFloat(newTotal) + parseFloat(cart[i].price);
    }
    setTotal(parseFloat(newTotal).toFixed(2));
  }, [cart])

  async function removeItem(e) {
    let value = e.target.value;
    try {
      const response = await axios.delete(`${process.env.REACT_APP_OTG_SERVER}/removeitem/${value}`);
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
      <div>
        <Link className='ease-in-out duration-200 rounded-lg flex justify-center align-center absolute top-2 left-2 p-1 cursor-pointer bg-[#47220f] text-white border-2 border-[#47220f] hover:bg-[#d8ccb6] hover:text-[#47220f]' to="/">Back to Home</Link>
        <div className='animate-rise flex flex-col justify-center items-center'>
          <img src={emptyCart} alt='cart empty' />
          <h1 className='uppercase text-2xl font-bold py-4'>your cart is currently empty!</h1>
          <Link className='ease-in-out duration-200 rounded-lg flex justify-center align-center p-1 cursor-pointer bg-[#47220f] text-white border-2 border-[#47220f] hover:bg-[#d8ccb6] hover:text-[#47220f]' to="/products">View Our Products!</Link>
        </div>
      </div>
    )
  }

  return (
    <div className='animate-rise flex flex-col justify-center items-center'>
      <h1 className='uppercase text-3xl sm:text-3xl md:text-5xl lg:text-5xl font-bold py-4'>Your Cart</h1>
      <Link className='ease-in-out duration-200 rounded-lg flex justify-center align-center absolute top-2 left-2 p-1 cursor-pointer bg-[#47220f] text-white border-2 border-[#47220f] hover:bg-[#d8ccb6] hover:text-[#47220f]' to="/">Back to Home</Link>
      <div className='flex flex-col sm:flex-col md:flex-row lg:flex-row w-3/4 gap-10 justify-center items-center'>
        <div className='rounded-xl grid grid-rows-auto py-1 w-full sm:w-full md:w-3/4 lg:w-3/4 bg-[#47220f] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'>
          <div className='grid grid-cols-5 p-4 mx-2'>
            <h1 className='text-white text-center'>Item Picture</h1>
            <h1 className='text-white text-center'>Item Name</h1>
            <h1 className='text-white text-center'>Weight Selected</h1>
            <h1 className='text-white text-center'>Price Per Bag (USD)</h1>
          </div>
          {cart.map((product, index) => {
            console.log(product.item);
            var productImg;
            switch(product.item) {
              case 'arabica':
                productImg = arabicaImage;
                break;
              case 'bourbon':
                productImg = bourbonImage;
                break;
              case 'excelsa':
                productImg = excelsaImage;
                break;
              case 'french':
                productImg = frenchImage;
                break;
              case 'geisha':
                productImg = geishaImage;
                break;
              case 'liberica':
                productImg = libericaImage;
                break;
              case 'robusta':
                productImg = robustaImage;
                break;
              case 'typica':
                productImg = typicaImage;
                break;
              case 'green tea':
                productImg = greenImage;
                break;
              case 'herbal tea':
                productImg = herbalImage;
                break;
              case 'white tea':
                productImg = whiteImage;
                break;
              case 'rose tea':
                productImg = roseImage;
                break;
              default:
                productImg = '';
            }
            return (
              <div className='font-bold rounded-md bg-[#d8ccb6] grid grid-cols-5 p-4 mx-2 my-1 gap-4 align-center justify-center text-center'>
                <img className='w-20 h-20' src={productImg} alt='product' />
                <h1 className='flex flex-col capitalize justify-center'>{product.item}</h1>
                <h1 className='flex flex-col justify-center'>{product.weight}</h1>
                <h1 className='flex flex-col justify-center'>{product.price}</h1>
                <button className='flex flex-col justify-center items-center underline' value={product._id} onClick={(e) => removeItem(e)}>remove</button>
              </div>
            )
          })}
        </div>
        <div className='top-0 flex flex-col w-full sm:w-full md:w-3/4 lg:w-3/4 gap-4 border-l-2 border-[#47220f] border-r-2 border-[#47220f] w-1/4 justify-center items-center mb-10 sm:mb-10 md:mb-0 lg:mb-0'>
          <h1 className='uppercase text-4xl font-bold py-4'>Total</h1>
          <h2 className='uppercase text-xl font-bold py-4'>Total Items: {cart.length}</h2>
          <h2 className='uppercase text-xl font-bold py-4'>Total Price: ${total}</h2>
          <Link className='ease-in-out duration-200 text-center h-auto rounded-lg p-1 mt-1 cursor-pointer bg-[#47220f] border-2 border-[#47220f] text-white hover:bg-[#d8ccb6] hover:text-[#47220f]' to='/checkout'>Proceed to Checkout</Link>
        </div>
      </div>
    </div>
)
}

export default Cart;