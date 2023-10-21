
import React from 'react'
import CurrentLocation from './CurrentLocation'
import Favourites from './NavFavourites'
import Filters from './Filter'
import Language from './Language'
import NavNotifty from './NavNotifty'
import Profile from './Profile'
import ProductSearch from './Search'
import Search from './Search'

interface Product {
  id: number;
  name: string;
  price: number;
  location: string;
  images: any
  // Add other product properties here
}

interface NavProp{
isDark:boolean
products: Product[]; // Pass the product data to the Nav component

}


const Nav:React.FC<NavProp>=({isDark, products}) =>{
  return (
    < div className={`border-b pb-3 md:ml-[10%] bg-white  fixed md:w-full w-full shadow-md md:shadow-none z-20 p-2 ${isDark ? 'nav' : ''}`}>
    <div className='md:hidden flex mt-14 w-10/12 items-center gap-2 m-auto'>
    <ProductSearch products={products} />
      </div>

    <div className={`relative m-auto w-full hidden items-center justify-center gap-2 md:mt-0 mt-2 md:gap-5 p-2 md:p-3 cursor-pointer md:flex z-50`}>
      <CurrentLocation />
      <Language />
      <Favourites />
      <NavNotifty />
      <Profile />
    </div>
    </div>
  )
}

export default Nav