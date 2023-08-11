import React from 'react';
import { useLocation } from 'react-router-dom';

function IndivProduct() {
  const location = useLocation();
  const productDetails = location.state;
  console.log("indiv product");
  console.log(productDetails);
  return (
    <div>

    </div>
  );
}

export default IndivProduct;