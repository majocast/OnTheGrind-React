import React, { useState, useEffect } from 'react';
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
  {name: 'arabica', price: '$19.95-$46.75', image: arabicaImage, class: 'all coffee', description: 'A high-quality and flavorful type of coffee known for its mild taste, pleasant acidity, and aromatic qualities.'},
  {name: 'bourbon', price: '$19.95-$46.75', image: bourbonImage, class: 'all coffee', description: 'A variety of Arabica coffee known for its rich and complex flavor profile, often exhibiting notes of sweetness, fruitiness, and sometimes chocolate.'},
  {name: 'excelsa', price: '$19.95-$46.75', image: excelsaImage, class: 'all coffee', description: 'A unique and distinct type of coffee with a flavor profile that can range from fruity and wine-like to spicy and earthy, offering a diverse and intriguing taste experience.'},
  {name: 'french roast', price: '$19.95-$46.75', image: frenchImage, class: 'all coffee', description: 'A dark roast characterized by its bold, smoky flavor, and pronounced bitterness, often with a shiny, dark appearance on the beans.'},
  {name: 'geisha', price: '$19.95-$46.75', image: geishaImage, class: 'all coffee', description: 'Known for its exceptional and delicate flavor profile, which can include floral, fruity, and tea-like notes, often fetching a premium price due to its unique taste and limited availability.'},
  {name: 'liberica', price: '$19.95-$46.75', image: libericaImage, class: 'all coffee', description: 'A distinctive and less common coffee species known for its larger beans, bold flavor profile, and sometimes fruity or floral undertones.'},
  {name: 'robusta', price: '$19.95-$46.75', image: robustaImage, class: 'all coffee', description: 'A hardier coffee species characterized by its strong and bold flavor, higher caffeine content, and often earthy or nutty notes.'},
  {name: 'typica', price: '$19.95-$46.75', image: typicaImage, class: 'all coffee', description: 'Renowned for its balanced and mild flavor profile, often featuring notes of sweetness, floral undertones, and bright acidity.'},
  {name: 'green tea', price: '$19.95-$46.75', image: greenImage, class: 'all tea', description: 'Fresh and grassy taste, vibrant green color, and potential health benefits, offering a light and refreshing beverage with a delicate balance of sweetness and astringency.'},
  {name: 'herbal tea', price: '$19.95-$46.75', image: herbalImage, class: 'all tea', description: 'A caffeine-free infusion made from various dried herbs, flowers, fruits, or spices, offering a diverse range of flavors and potential health benefits, often enjoyed for its soothing and aromatic qualities.'},
  {name: 'white tea', price: '$19.95-$46.75', image: whiteImage, class: 'all tea', description: 'Known for its subtle and light flavor profile, often featuring delicate floral or fruity notes, prized for its high antioxidant content and potential health benefits.'},
  {name: 'rose tea', price: '$19.95-$46.75', image: roseImage, class: 'all tea', description: 'An aromatic herbal infusion made from dried rose petals, offering a fragrant and soothing beverage with a subtly floral taste and potential relaxation properties.'},
]


const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);


  const handleFilterSelection = (newFilter) => {
    console.log('new filter: ' + newFilter);
    setFilter(newFilter);
  }

  const openModal = (name, description) => {
    setSelectedProduct({ name, description });
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  }

  return (
    <div className='animate-rise flex flex-col items-center justify-center'>
      <h1 className='uppercase text-5xl font-bold py-4'>Products</h1>
      <h2 className='uppercase text-md font-bold pb-4'>**all products are sold by the bag**</h2>
      <div className='space-x-4 pb-6' align="center">
        <button class="ease-in-out duration-200 rounded-md p-2 bg-white" onClick={() => handleFilterSelection('all')}>Show All</button>
        <button class="ease-in-out duration-200 rounded-md p-2 bg-white" onClick={() => handleFilterSelection('coffee')}>Coffee</button>
        <button class="ease-in-out duration-200 rounded-md p-2 bg-white" onClick={() => handleFilterSelection('tea')}>Tea</button>
      </div>
      <div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-8 w-5/6'>
        {products.map((product) => {
          if(product.class.includes(filter)) {
            return (
              <div className="relative flex flex-col rounded-2xl bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <img
                  className="rounded-t-2xl h-2/3"
                  src={product.image}
                  alt={product.name} />
                <div className="p-4 h-1/3">
                  <h5
                    className="mb-1 text-xl uppercase font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    {product.name}
                  </h5>
                  <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    {product.description}
                  </p>
                  <button
                    onClick={() => openModal(product.name, product.description)}
                    type="button"
                    className="absolute bottom-4 left-4 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    buy
                  </button>
                </div>
              </div>
            ) 
          }
          return null;
        })}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} selectedProduct={selectedProduct}/>
    </div>
  );
}

export default Products;