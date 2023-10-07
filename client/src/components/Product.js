import React from 'react';

const Product = ({product, index, openModal}) => {
  return (
    <div key={index} className="h-[32rem] relative flex flex-col rounded-2xl bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <img
        className="rounded-t-2xl h-2/3"
        src={product.image}
        alt={product.name} />
      <div className="p-4 h-1/3">
        <h5
          className="mb-1 text-xl uppercase font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {product.name}
        </h5>
        <p className="flex mb-4 text-sm sm:text-sm md:text-md lg:text-md text-base text-neutral-600 dark:text-neutral-200">
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

export default Product;