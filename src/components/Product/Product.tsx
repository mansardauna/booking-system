import React, { useState } from 'react';
import { ArrowRight, Heart, HeartAdd, Location, Star1 } from 'iconsax-react';

import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';
import RoomGallery from './RoomGallery';
import { ActionTypes, useStoreDispatch } from '../../store/FavoriteContext';

type ProductProps = {
  productInfo: any;
  show: boolean;
};

const Product: React.FC<ProductProps> = ({ productInfo, show }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const storeDispatch = useStoreDispatch(); // Get the dispatch function from your store


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
  const media = [
    { type: 'image', url: productInfo.images[0], alt: productInfo.name },
    { type: 'video', url: productInfo.videos[0], alt: productInfo.name },
  ];
  if (!productInfo) {
    return <div>Product information is missing.</div>;
  }


  const handleFav = () => {
    setIsInWatchlist(!isInWatchlist);

    if (!isInWatchlist) {
      // Dispatch the action to add the item to the watchlist
      storeDispatch({ type: ActionTypes.ADD_TO_WATCHLIST, payload: productInfo });
    } else {
      // Dispatch the action to remove the item from the watchlist
      storeDispatch({ type: ActionTypes.REMOVE_FROM_WATCHLIST, payload: productInfo._id });
    }
  };
  return (
    <div className="border p-2 bg-slate-50 w-11/12 rounded-2xl border-gray-200 ">
      <RoomGallery media={media}/>
      <div className="flex items-center p-2 justify-between">
        <div className="text-xl font-semibold">{productInfo.name}</div>
        <div onClick={handleFav}>
        {isInWatchlist ? (
         <Heart />
        ):( <HeartAdd className="cursor-pointer"  />)}
        </div>
      </div>
      <div className="flex items-center p-2 justify-between">
      <div className="flex items-center cursor-pointer gap-1">
        <Star1 size={17} color={'gold'}/>
        <div className="font-semibold">{productInfo.rate}</div>
        <div className="star">star</div>
      </div>
      <div className="flex items-center gap-1">
        <Location size={14} color='red' /> 
        <div className="location">{productInfo.location}</div>
      </div>
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
