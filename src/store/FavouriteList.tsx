import React from "react";
import { useStore } from "./FavoriteContext";

interface Product {
  _id: number;
  img: string;
  name: string;
  price: number;
  quantity: number;
}

interface FavoriteListProps {
  onRemoveFromWatchlist: any;
  watchlistItems: Product[]; // Add the watchlistItems prop
}

const FavoriteList: React.FC<FavoriteListProps> = ({ onRemoveFromWatchlist, watchlistItems }) => {
  const removeFromWatchlist = 
    onRemoveFromWatchlist;
  

  if (watchlistItems.length === 0) {
    return <div>No favorite items to display.</div>;
  }

  return (
    <div>
      <h2>Favorite Items</h2>
      <ul>
        {watchlistItems.map((item: any) => (
          <li key={item._id}>
            <div>
              <img src={item.images[0]} alt={item.name} className='w-40 h-40' />
            </div>
            <div>
              <p>{item.name}</p>
              <p>Price: NGN{item.price}</p>
              <button onClick={  removeFromWatchlist}>
                Remove from Favorites
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteList;
