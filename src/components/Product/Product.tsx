import React, { useState } from 'react';
import { ArrowRight, HeartAdd, Star1 } from 'iconsax-react';

import Button from '../UI/Button';
import ProductDetail from '../../pages/productDetails/ProductDetails';
import { useNavigate } from 'react-router-dom';

type ProductProps = {
  productInfo: any;
  show: boolean;
};

const Product: React.FC<ProductProps> = ({ productInfo, show }) => {
  const [showDetail, setShowDetail] = useState(false);

  const _id = productInfo.name;
  const idString = (_id: string) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = productInfo;
  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        products: productItem,
      },
    }); 
  };

  return (
    <div className="border rounded-2xl border-gray-200">
      <img src={productInfo.image} alt={productInfo.name} className="md:h-40 md:w-80 w-full h-52 rounded-2xl m-auto" />
      <div className="flex items-center p-2 justify-between">
        <div className="text-xl font-semibold">{productInfo.name}</div>
        <HeartAdd size={20}className="cursor-pointer" />
      </div>
      <div className="flex items-center cursor-pointer gap-1">
        <Star1 size={17} color={'gold'} />
        <div className="font-semibold">{productInfo.rate}</div>
      </div>
      <div className="flex items-center justify-between p-2">
        <div>
          <span className="text-green-700 font-semibold">NGN</span> {productInfo.price}{' '}
          <span className="text-gray-400 font-light text-sm">/Day</span>
        </div>
        <Button onClick={handleProductDetails} variant="secondary" className="flex rounded-md px-4 gap-2 items-center">
          <div className="text-sm">View</div>
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Product;
