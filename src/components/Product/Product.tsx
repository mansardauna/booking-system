import { HeartAdd } from 'iconsax-react';
import React from 'react';
import { useCart } from '../../store/FavoriteContext';
import Button from '../UI/Button';


type ProductProps = {
  product: any;
};

const Product: React.FC<ProductProps> = ({ product }) => {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <Button variant='primary' className=' rounded-md px-2 flex md:gap-2 gap-1 bg-primary border-none items-center text-sm' onClick={addToCart}>
        <HeartAdd color='white' size={16} />
        <div>Favourite</div>
      </Button>
    </div>
  );
};

export default Product;
