import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';

function Checkout() {
  const history = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [formValid, setFormValid] = useState(false);

  const handleInputChange = () => {
    // Check if all required input fields have values
    const requiredFields = [
      'name',
      'street',
      'city',
      'state',
      'country',
      'cardNumber',
      'nameOnCard',
      'expiration',
      'zipCode',
      'cvv',
      'shipping',
      'scheduled',
      'shipName',
      'shipStreet',
      'shipCity',
      'shipState',
      'shipCountry',
      'shipZip',
      'email',
    ];

    const allFieldsFilled = requiredFields.every(fieldName => {
      const field = document.querySelector(`input[name="${fieldName}"]`);
      return field && field.value.trim() !== '';
    });

    setFormValid(allFieldsFilled);
  };

  async function pullCart() {
    try {
      const username = localStorage.getItem('username');
      const response = await axios.get(`${process.env.OTG_Server}/pullcart/${username}`);
      setCart(response.data[0]);
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
      const response = await axios.delete(`${process.env.OTG_Server}/removeitem/${value}`);
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

  const submitOrder = (event) => {
    event.preventDefault();
    if (!formValid) {
      alert('Please fill out all required fields.');
      return;
    }
    
    const billing = {
      name: document.querySelector('input[name="name"]').value,
      street: document.querySelector('input[name="street"]').value,
      city: document.querySelector('input[name="city"]').value,
      state: document.querySelector('input[name="state"]').value,
      country: document.querySelector('input[name="country"]').value,
      cardNumber: document.querySelector('input[name="cardNumber"]').value,
      nameOnCard: document.querySelector('input[name="nameOnCard"]').value,
      expiration: document.querySelector('input[name="expiration"]').value,
      zipCode: document.querySelector('input[name="zipCode"]').value,
      cvv: document.querySelector('input[name="cvv"]').value,
    };
  
    const shippingOption = document.querySelector('input[name="shipping"]:checked').value;
    const scheduledDate = document.querySelector('input[name="scheduled"]').value;
  
    const shippingInfo = {
      shipName: document.querySelector('input[name="shipName"]').value,
      shipStreet: document.querySelector('input[name="shipStreet"]').value,
      shipCity: document.querySelector('input[name="shipCity"]').value,
      shipState: document.querySelector('input[name="shipState"]').value,
      shipCountry: document.querySelector('input[name="shipCountry"]').value,
      shipZip: document.querySelector('input[name="shipZip"]').value,
      email: document.querySelector('input[name="email"]').value,
    };

    // Do something with the form data, like sending it to a server
    // Example using Axios:
    const username = localStorage.getItem('username');
    axios.post(`${process.env.OTG_Server}/submitorder/${username}`, {
      billing,
      shipping: {
        option: shippingOption,
        scheduledDate: new Date(scheduledDate),
      },
      shippingInfo,
      cart: cart,
    })
    .then(response => {
      alert('Order submitted successfully:', response.data);
      history('/');
      // Perform further actions or show success message to the user
    })
    .catch(error => {
      alert('Error submitting order:', error);
      // Handle errors or show error message to the user
    });
  };

  useEffect(() => {
    const inputFields = document.querySelectorAll('input');
    inputFields.forEach((field) => {
      field.addEventListener('input', handleInputChange);
    });

    return () => {
      inputFields.forEach((field) => {
        field.removeEventListener('input', handleInputChange);
      });
    };
  }, []); 

  return (
    <div className='animate-rise duration-200 flex flex-col items-center'>
      <img src={Logo} alt='logo' className='md:absolute lg:absolute top-0 w-80'/>
      <Link className='ease-in-out duration-200 rounded-lg flex justify-center align-center absolute top-2 left-2 p-1 cursor-pointer bg-[#47220f] text-white border-2 border-[#47220f] hover:bg-[#d8ccb6] hover:text-[#47220f]' to="/">Back to Home</Link>
      <h1 className='uppercase text-3xl sm:text-3xl md:text-5xl lg:text-5xl font-bold py-4 align-center text-center'>Place Your Order</h1>
      <form className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 grid-rows-2 w-11/12 pb-10'>
        <div className='w-full h-full flex flex-col gap-2 p-2 items-center'>
          <h2 className='uppercase text-3xl font-bold py-4 align-center'>Your Cart</h2>
          <div className='w-full flex gap-2'>
            <div className='rounded-xl grid grid-rows-auto py-1 w-3/4 bg-[#47220f] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'>
              <div className='grid grid-cols-4 p-4 mx-2'>
                <h1 className='text-white'>Item Name</h1>
                <h1 className='text-white'>Weight Selected</h1>
                <h1 className='text-white'>Price Per Bag (USD)</h1>
              </div>
              {cart.map((product, index) => {
                return (
                  <div className='rounded-md bg-[#d8ccb6] grid grid-cols-4 p-4 mx-2 my-1'>
                    <h1 className='capitalize'>{product.item}</h1>
                    <h1>{product.weight}</h1>
                    <h1>{product.price}</h1>
                    <button value={product._id} onClick={(e) => removeItem(e)}>remove</button>
                  </div>
                )
              })}
            </div>
            <div className='top-0 flex flex-col justify-center align-center gap-4 border-l-2 border-[#47220f] border-r-2 border-[#47220f] w-1/4 justify-center items-center'>
              <h1 className='uppercase text-2xl font-bold py-4 text-center'>Total</h1>
              <h2 className='uppercase text-lg font-bold py-4 text-center'>Total Items: {cart.length}</h2>
              <h2 className='uppercase text-lg font-bold py-4 text-center'>Total Price: ${total}</h2>
            </div>
          </div>
        </div>
        <div className='w-full h-full flex flex-col gap-2 p-2 items-center'>
          <h2 className='uppercase text-3xl font-bold py-4 align-center'>Billing Information</h2>
          <input className='rounded-lg px-2 py-1 w-full' type='text' placeholder='Name' name='name' required/>
          <input className='rounded-lg px-2 py-1 w-full' type='text' placeholder='Street Address' name='street' required/>
          <input className='rounded-lg px-2 py-1 w-full' type='text' placeholder='City' name='city' required/>
          <input className='rounded-lg px-2 py-1 w-full' type='text' placeholder='State' name='state' required/>
          <input className='rounded-lg px-2 py-1 w-full' type='text' placeholder='Country' name='country' required/>
          <input className='rounded-lg px-2 py-1 w-full' type='text' placeholder='Card Number' name='cardNumber' required/>
          <input className='rounded-lg px-2 py-1 w-full' type='text' placeholder='Name On Card' name='nameOnCard' required/>
          <input className='rounded-lg px-2 py-1 w-full' type='text' placeholder='Expiration' name='expiration' required/>
          <input className='rounded-lg px-2 py-1 w-full' type='text' placeholder='Zip Code' name='zipCode' required/>
          <input className='rounded-lg px-2 py-1 w-full' type='text' placeholder='CVV/CVC' name='cvv' required/>
        </div>
        <div className='flex flex-col w-full h-ful items-center justify-center order-2 sm:order-1'>
          <h2 className='uppercase text-3xl font-bold py-4 align-center'>Shipping Options</h2>
          <div className='flex flex-col gap-2 w-5/6 p-2'>
            <label for='2-day'>
              <input type='radio' name='shipping' value='2-day' /> 
              2-Day Shipping
            </label>
            <label for='normal'>
              <input type='radio' name='shipping' value='normal' />
              Normal Shipping
            </label>
            <label for='scheduled'>
              <input type='radio' name='shipping' value='scheduled' />
              Scheduled Shipping
            </label>
            <input type='date' placeholder='mm-dd-yyyy' min='2023-08-15' max='2065-08-14' name='scheduled' />
            <button className='ease-in-out duration-200 rounded-lg flex justify-center align-center p-1 cursor-pointer bg-[#47220f] text-white border-2 border-[#47220f] hover:bg-[#d8ccb6] hover:text-[#47220f]' onClick={(e) => submitOrder(e)}>place order</button>
          </div>
        </div>
        <div className='w-full h-full flex flex-col gap-2 p-2 items-center order-1 sm:order-2'>
          <h2 className='uppercase text-3xl font-bold py-4 align-center'>Shipping Information</h2>
          <input className='rounded-lg px-2 py-1 w-full' type='text' placeholder='Name' name='shipName' required/>
          <input className='rounded-lg px-2 py-1 w-full' type='text' placeholder='Street Address' name='shipStreet' required/>
          <input className='rounded-lg px-2 py-1 w-full' type='text' placeholder='City' name='shipCity' required/>
          <input className='rounded-lg px-2 py-1 w-full' type='text' placeholder='State' name='shipState' required/>
          <input className='rounded-lg px-2 py-1 w-full' type='text' placeholder='Country' name='shipCountry' required/>
          <input className='rounded-lg px-2 py-1 w-full' type='number' placeholder='Zip Code' name='shipZip' required/>
          <input className='rounded-lg px-2 py-1 w-full' type='email' placeholder='Email' name='email' required/>
        </div>
      </form>
    </div>
  )
}

export default Checkout;