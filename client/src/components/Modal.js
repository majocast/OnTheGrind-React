// Modal.js
import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="flex fixed top-0 left-0 w-screen h-screen justify-center items-center bg-gray-950/50">
      <div className="relative h-3/4 w-1/2 top-50 left-50 flex flex-col items-center justify-center bg-white rounded-2xl">
        <h2 className='border-black'>Modal Title</h2>
        <p>This is the content of the modal window.</p>
        <button className='absolute top-0 left-0 p-4 hover:color-[]' onClick={onClose}><AiOutlineCloseCircle size={30}/></button>
      </div>
    </div>
  );
};

export default Modal;
