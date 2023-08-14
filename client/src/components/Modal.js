// Modal.js
import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Modal = ({ isOpen, onClose, selectedProduct }) => {

  const getSelectedValue = (value) => {
    console.log(value)
  }

  const submit = () => {
    console.log("added to cart");
  }

  if (!isOpen) return null;

  return (
    <div className="flex fixed top-0 left-0 w-screen h-screen justify-center items-center bg-gray-950/50">
      <div className="animate-rise relative h-3/4 w-1/2 top-50 left-50 flex flex-col items-center justify-center bg-white rounded-2xl">
        <div className='w-5/6 flex flex-col justify-center items-center'>
          <h1 className='uppercase text-5xl font-bold py-4'>{selectedProduct.name}</h1>
          <p className='text-center'>{selectedProduct.description}</p>
          <form action='POST'>
            <select onChange={(e) => getSelectedValue(e.target.value)}>
              <option disabled selected value='select'>Select an option!</option>
              <option value='1lb'>$19.95 for 1lbs</option>
              <option value='2.5lb'>$32.75 for 2.5lbs</option>
              <option value='5lb'>$46.75 for 5lbs</option>
            </select>
            <input type='submit' value='Add to Cart' onClick={submit}/>
          </form>
        </div>
        <button className='absolute top-0 left-0 p-4' onClick={onClose}><AiOutlineCloseCircle size={30}/></button>
      </div>
    </div>
  );
};

export default Modal;
