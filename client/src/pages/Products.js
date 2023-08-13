import React, { useState } from 'react';
import Modal from '../components/Modal';
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

const products = [
  {name: 'arabica', price: '$19.95-$46.75', image: arabicaImage, class: 'all coffee'},
  {name: 'bourbon', price: '$19.95-$46.75', image: bourbonImage, class: 'all coffee'},
  {name: 'excelsa', price: '$19.95-$46.75', image: excelsaImage, class: 'all coffee'},
  {name: 'french roast', price: '$19.95-$46.75', image: frenchImage, class: 'all coffee'},
  {name: 'geisha', price: '$19.95-$46.75', image: geishaImage, class: 'all coffee'},
  {name: 'liberica', price: '$19.95-$46.75', image: libericaImage, class: 'all coffee'},
  {name: 'robusta', price: '$19.95-$46.75', image: robustaImage, class: 'all coffee'},
  {name: 'typica', price: '$19.95-$46.75', image: typicaImage, class: 'all coffee'},
  {name: 'green tea', price: '$19.95-$46.75', image: greenImage, class: 'all tea'},
  {name: 'herbal tea', price: '$19.95-$46.75', image: herbalImage, class: 'all tea'},
  {name: 'white tea', price: '$19.95-$46.75', image: whiteImage, class: 'all tea'},
  {name: 'rose tea', price: '$19.95-$46.75', image: roseImage, class: 'all tea'},
]


const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleFilterSelection = (newFilter) => {
    console.log('new filter: ' + newFilter);
    setFilter(newFilter);
  }

  const openModal = (name) => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='uppercase text-5xl font-bold py-8'>Products</h1>
      <div className='space-x-4 pb-4' align="center">
        <button class="rounded-md p-2 bg-white" onClick={() => handleFilterSelection('all')}>Show All</button>
        <button class="rounded-md p-2 bg-white" onClick={() => handleFilterSelection('coffee')}>Coffee</button>
        <button class="rounded-md p-2 bg-white" onClick={() => handleFilterSelection('tea')}>Tea</button>
        <button class="rounded-md p-2 bg-white" onClick={() => handleFilterSelection('other')}>Other</button>
      </div>
      <div className='grid grid-cols-4 gap-10 pb-8 w-5/6'>
        {products.map((product) => {
          if(product.class.includes(filter)) {
            return (
              <div className="flex flex-col rounded-2xl bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <img
                  className="rounded-t-2xl h-3/4"
                  src={product.image}
                  alt={product.name} />
                <div className="p-4 h-1/4">
                  <h5
                    className="mb-1 text-xl uppercase font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    {product.name}
                  </h5>
                  <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </p>
                  <button
                    onClick={() => openModal(product.name)}
                    type="button"
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    buy
                  </button>
                </div>
              </div>
            ) 
          }
        })}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default Products;