import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductDetail from '../ProductDetails';

function Detail() {
  const location = useLocation();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (location.state && location.state.products) {
      setProduct(location.state.products);
    }
  }, [location]);

  return (
    <div>
      {product && <ProductDetail productInfo={product} />}
    </div>
  );
}

export default Detail;
