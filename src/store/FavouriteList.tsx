import React from "react";
import { useStore } from "./FavoriteContext";

interface FavoriteListProps {
  onRemoveFromWatchlist: (itemId: number) => void;
}

// Function to save the watchlist items to local storage
const saveToLocalStorage = (watchlist: any) => {
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

// Function to load the watchlist items from local storage
const loadFromLocalStorage = () => {
  const watchlist = localStorage.getItem("watchlist");
  return watchlist ? JSON.parse(watchlist) : [];
}

const FavoriteList: React.FC<FavoriteListProps> = ({ onRemoveFromWatchlist }) => {
  const [watchlistItems, setWatchlistItems] = React.useState<any[]>(loadFromLocalStorage());

  const removeFromWatchlist = (itemId: number) => {
    // Call the parent component's callback to remove the item from the watchlist
    onRemoveFromWatchlist(itemId);

    // Remove the item from the local watchlist
    const updatedWatchlist = watchlistItems.filter((item) => item._id !== itemId);
    setWatchlistItems(updatedWatchlist);
    saveToLocalStorage(updatedWatchlist); // Save the updated watchlist to local storage
  };

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
              <button onClick={() => removeFromWatchlist(item._id)}>
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
