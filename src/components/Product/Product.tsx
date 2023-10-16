import { ArrowRight, HeartAdd, Star1 } from 'iconsax-react';
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
    <div className='border rounded-2xl border-gray-200 '>
      <img src={product.image} alt={product.name} className="md:h-40 md:w-80 w-full h-52 rounded-2xl m-auto" />
      <div className="flex items-center p-2 justify-between">
      <div className=' text-xl font-semibold'>{product.name}</div>
      <HeartAdd size={20} onClick={addToCart} className="cursor-pointer" />

      <div className="flex items-center cursor-pointer gap-1">
      <Star1 size={17} color={'gold'} />
      <div className=' font-semibold'>{product.rate}</div>
      </div>
      </div>
      <div className="flex items-center justify-between p-2">
      <div><span className=' text-green-700 font-semibold'>NGN</span> {product.price} <span className=' text-gray-400 font-light text-sm'>/Day</span></div>
      <Button onClick={addToCart} variant='secondary' className='flex rounded-md px-4 gap-2 items-center'>
        <div className="text-sm">View</div>
        <ArrowRight size={16}/>
        </Button> 
     
    </div>
    </div>
  );
};

export default Product;
