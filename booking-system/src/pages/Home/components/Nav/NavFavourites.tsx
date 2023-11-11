import { Heart } from 'iconsax-react'
import React from 'react'
import { Link } from 'react-router-dom';
import { useStore } from '../../../../store/FavoriteContext';

function NavFavourites() {
  const { state } = useStore();

  return (
    <Link to="/favourite" className='relative'>
      <div className="absolute left-0 bottom-4 bg-white text-red-500 rounded-s-full w-fit font-bold">
      {state.watchlist.length}</div>
    <div className='flex gap-1'>
      <Heart />
      <div className="hidden md:block">Favourites</div>
    </div>
    </Link>
  )
}

export default NavFavourites;