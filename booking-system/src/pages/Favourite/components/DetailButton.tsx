import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/UI/Button';

interface DetailButtonProps{
  watchlistItems: any
}

const DetailButton:React.FC<DetailButtonProps> =({watchlistItems}) => {
  const _id = watchlistItems.name

  const idString = (_id: string) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = watchlistItems;
  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        products: productItem,
      },
    }); 
  };
 

  return (
<Button variant='secondary' onClick={handleProductDetails} className="rounded-md">Proceed</Button>  )
}

export default DetailButton