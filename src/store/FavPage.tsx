import React, { useContext } from "react";
import FavoriteList from "./FavouriteList";
import { ActionTypes, useStore, useStoreDispatch } from "./FavoriteContext"; // Import the store dispatch function

function FavPage() {
  const storeDispatch = useStoreDispatch(); // Get the dispatch function from your context
  const { state } = useStore();


  // Define the function to remove an item from the watchlist
  const removeFromWatchlist = (itemId:any) => {
    // Dispatch an action to remove the item from the watchlist
    storeDispatch({ type: ActionTypes.REMOVE_FROM_WATCHLIST, payload: itemId._id });
    }
  return (
    <div>
      <h1>My Favorite List</h1>
      <FavoriteList onRemoveFromWatchlist={removeFromWatchlist} watchlistItems={state.watchlist} />
    </div>
  );
}

export default FavPage;
