import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Modal = ({ isOpen, onClose, selectedProduct }) => {
  const history = useNavigate();
  const [cartItem, setCartItem] = useState('');
  const [cartValue, setCartValue] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(localStorage.getItem('username'));
  }, [])

  const getSelectedValue = (value, selectedItem) => {
    setCartValue(value);
    setCartItem(selectedItem);
  }

  async function submit(event) {
    event.preventDefault();
    let weightPrice = {
      '1lb': 19.95,
      '2.5lb': 32.95,
      '5': 49.99,
    }
    let price = weightPrice[cartValue];
    const user = localStorage.getItem('username');
    try {
      console.log(cartValue, price, cartItem, user);
      await axios.post(`${process.env.REACT_APP_OTG_SERVER}/addcart`, {
        cartValue, cartItem, user, price
      })
      .then((res) => {
        if(res.data === 'item successfully added to cart!') {
          alert('item successfully added to cart!');
          history('/products');
        }
        else if(res.data === 'could not complete add item') {
          alert('error occurred: could not complete add item')
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
  }

  if (!isOpen) return null;

  return (
    <div className="z-20 flex fixed top-0 left-0 w-screen h-screen justify-center items-center bg-gray-950/50">
      <div className="animate-rise relative h-3/4 w-1/2 top-50 left-50 flex flex-col items-center justify-center bg-white rounded-2xl">
        <div className='w-5/6 flex flex-col justify-center items-center'>
          <h1 className='uppercase text-5xl font-bold py-4'>{selectedProduct.name}</h1>
          <p className='text-center'>{selectedProduct.description}</p>
          <form action='POST' className='flex gap-4 drop-shadow-lg py-2'>
            {user ? <div className='flex gap-4 drop-shadow-lg py-2'>
              <select onChange={(e) => getSelectedValue(e.target.value, selectedProduct.name)} className='cursor-pointer'>
                <option selected value='select'>Select an option!</option>
                <option value='1lb'>$19.95 for 1lbs</option>
                <option value='2.5lb'>$32.75 for 2.5lbs</option>
                <option value='5lb'>$46.75 for 5lbs</option>
              </select>
              <input className='text-white rounded-xl transition ease-in-out duration-50 cursor-pointer bg-[#47220f] border-2 border-[#d8ccb6] p-2 drop-shadow-lg hover:border-[#47220f] hover:bg-[#d8ccb6] hover:text-[#47220f]' type='button' value='Add to Cart' onClick={(e) => submit(e)}/>
            </div>
            : 
            <div className='flex flex-col items-center'>
              <p className='uppercase text-red-600 font-bold py-4'>Please Log In to Place an Order</p>
              <Link to='/login' className='text-white rounded-xl transition ease-in-out duration-50 cursor-pointer bg-[#47220f] border-2 border-[#d8ccb6] p-2 drop-shadow-lg hover:border-[#47220f] hover:bg-[#d8ccb6] hover:text-[#47220f]'>Login/Register</Link>
            </div>}
          </form>
        </div>
        <button className='absolute top-0 left-0 p-4' onClick={onClose}><AiOutlineCloseCircle size={30}/></button>
      </div>
    </div>
  );
};

export default Modal;
