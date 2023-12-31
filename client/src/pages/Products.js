import React, { useState } from 'react';
import Modal from '../components/Modal';
import Product from '../components/Product';
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
  {name: 'excelsa', price: '$19.95-$46.75', image: excelsaImage, class: 'all coffee', description: 'A unique and distinct type of coffee with a flavor profile that can range from fruity and wine-like to spicy and earthy.'},
  {name: 'french roast', price: '$19.95-$46.75', image: frenchImage, class: 'all coffee', description: 'A dark roast characterized by its bold, smoky flavor, and pronounced bitterness, often with a shiny, dark appearance on the beans.'},
  {name: 'geisha', price: '$19.95-$46.75', image: geishaImage, class: 'all coffee', description: 'Known for its exceptional and delicate flavor profile, which can include floral, fruity, and tea-like notes.'},
  {name: 'liberica', price: '$19.95-$46.75', image: libericaImage, class: 'all coffee', description: 'Known for its larger beans, bold flavor profile, and sometimes fruity or floral undertones.'},
  {name: 'robusta', price: '$19.95-$46.75', image: robustaImage, class: 'all coffee', description: 'Characterized by its strong and bold flavor, higher caffeine content, and often earthy or nutty notes.'},
  {name: 'typica', price: '$19.95-$46.75', image: typicaImage, class: 'all coffee', description: 'Often featuring notes of sweetness, floral undertones, and bright acidity.'},
  {name: 'green tea', price: '$19.95-$46.75', image: greenImage, class: 'all tea', description: 'Fresh and grassy taste, vibrant green color, and potential health benefits, offering a light and refreshing beverage.'},
  {name: 'herbal tea', price: '$19.95-$46.75', image: herbalImage, class: 'all tea', description: 'Dried herbs, flowers, fruits, or spices, offering a diverse range of flavors and potential health benefits, often enjoyed for its soothing and aromatic qualities.'},
  {name: 'white tea', price: '$19.95-$46.75', image: whiteImage, class: 'all tea', description: 'Often featuring delicate floral or fruity notes, prized for its high antioxidant content and potential health benefits.'},
  {name: 'rose tea', price: '$19.95-$46.75', image: roseImage, class: 'all tea', description: 'An aromatic herbal infusion made from dried rose petals, offering a fragrant and soothing beverage with a subtly floral taste.'},
]


function Products() {
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
      <h1 className='uppercase text-3xl sm:text-3xl md:text-5xl lg:text-5xl font-bold py-4'>Products</h1>
      <h2 className='uppercase text-md font-bold pb-4'>**all products are sold by the bag**</h2>
      <div className='space-x-4 pb-6 hover:border-[#47220f] hover:bg-[#d8ccb6] hover:text-[#47220f]' align="center">
        <button class="text-white rounded-xl transition ease-in-out duration-50 cursor-pointer bg-[#47220f] border-2 border-[#d8ccb6] p-2 drop-shadow-lg hover:border-[#47220f] hover:bg-[#d8ccb6] hover:text-[#47220f]" onClick={() => handleFilterSelection('all')}>Show All</button>
        <button class="text-white rounded-xl transition ease-in-out duration-50 cursor-pointer bg-[#47220f] border-2 border-[#d8ccb6] p-2 drop-shadow-lg hover:border-[#47220f] hover:bg-[#d8ccb6] hover:text-[#47220f]" onClick={() => handleFilterSelection('coffee')}>Coffee</button>
        <button class="text-white rounded-xl transition ease-in-out duration-50 cursor-pointer bg-[#47220f] border-2 border-[#d8ccb6] p-2 drop-shadow-lg hover:border-[#47220f] hover:bg-[#d8ccb6] hover:text-[#47220f]" onClick={() => handleFilterSelection('tea')}>Tea</button>
      </div>
      <div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-8 w-5/6'>
        {products.map((product, index) => {
          if(product.class.includes(filter)) {
            return (
              <Product product={product} index={index} openModal={openModal} />
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