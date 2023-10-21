import { Heart } from 'iconsax-react'
import React from 'react'
import { Link } from 'react-router-dom';

function NavFavourites() {
  return (
    <Link to="/favourite">
    <div className='flex gap-1'>
      <Heart />
      <div className="hidden md:block">Favourites</div>
    </div>
    </Link>
  )
}

export default NavFavourites;