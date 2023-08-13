import React, { useState } from 'react';
import { Link } from'react-router-dom';
import arabicaImage from '../images/arabica.jpg';

const products = [
  {name: 'arabica', price: '$19.95-$46.75', image: arabicaImage, class: 'all coffee'},
  {name: 'bourbon', price: '$19.95-$46.75', image: arabicaImage, class: 'all coffee'},
  {name: 'excelsa', price: '$19.95-$46.75', image: arabicaImage, class: 'all coffee'},
  {name: 'french roast', price: '$19.95-$46.75', image: arabicaImage, class: 'all coffee'},
  {name: 'geisha', price: '$19.95-$46.75', image: arabicaImage, class: 'all coffee'},
  {name: 'liberica', price: '$19.95-$46.75', image: arabicaImage, class: 'all coffee'},
  {name: 'robusta', price: '$19.95-$46.75', image: arabicaImage, class: 'all coffee'},
  {name: 'typica', price: '$19.95-$46.75', image: arabicaImage, class: 'all coffee'},
  {name: 'green tea', price: '$19.95-$46.75', image: arabicaImage, class: 'all tea'},
  {name: 'herbal tea', price: '$19.95-$46.75', image: arabicaImage, class: 'all tea'},
  {name: 'white tea', price: '$19.95-$46.75', image: arabicaImage, class: 'all tea'},
  {name: 'shirt1', price: '$19.95-$46.75', image: arabicaImage, class: 'all other'},
  {name: 'shirt2', price: '$19.95-$46.75', image: arabicaImage, class: 'all other'},
  {name: 'shirt3', price: '$19.95-$46.75', image: arabicaImage, class: 'all other'},
]


const Products = () => {
  const [filter, setFilter] = useState('all');

  const handleFilterSelection = (newFilter) => {
    console.log('new filter: ' + newFilter);
    setFilter(newFilter);
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
              <div
                className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <a href="#!">
                  <img
                    className="rounded-t-lg"
                    src={product.image}
                    alt={product.name} />
                </a>
                <div className="p-6">
                  <h5
                    class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    {product.name}
                  </h5>
                  <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </p>
                  <button
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
    </div>
  );
}

export default Products;