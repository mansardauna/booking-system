import { CloseSquare, HambergerMenu, Moon, Sun1 } from 'iconsax-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CurrentLocation from '../../pages/Home/components/Nav/CurrentLocation';
import Favourites from '../../pages/Home/components/Nav/NavFavourites';
import Language from '../../pages/Home/components/Nav/Language';
import NavNotifty from '../../pages/Home/components/Nav/NavNotifty';
import { NavList, Rate } from '../ItemMap.tsx/NavList';

interface SidebarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const MobileSidebar: React.FC<SidebarProps> = ({isDarkMode, toggleDarkMode}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  function handleToggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className='md:hidden block w-full  fixed z-50'>
      {isSidebarOpen ? (
        <div className=" top-0  w-full left-2 p-2 justify-between flex items-center">
          <HambergerMenu size={32} onClick={handleToggleSidebar} />
<div className="flex gap-2">
          <NavNotifty/> 
          <Favourites />
          <CurrentLocation />
        </div>
        </div>
      ) : (
        <div className={`flex flex-col gap-5 relative bg-primary z-10  w-2/4 h-screen p-2 pr-0 justify-between pb-20 text-white ${isSidebarOpen ? 'hidden' : 'block'}`}>
           <div className="mx-auto my-2 text-center w-9/12 logo md:text-2xl text-3xl font-semibold">Event Hall</div>
          <div className={`toggle md:hidden absolute right-2 top-2`} onClick={handleToggleSidebar}>
            <CloseSquare />
          </div>
          <div className='mt-10'>
            {NavList.map((item) => (
              <Link to={item.link} key={item.id}>
                <div className='flex cursor-pointer p-3 items-center text-sm md:text-xl hover:text-gray-300 hover:border-r-4 border-white gap-3'>
                  <div>{item.icon}</div>
                  <div>{item.title}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className='w-10/12 border-t m-auto mb-0 border-white pt-5'>
            {Rate.map((item) => (
              <Link to={item.link} key={item.id}>
                <div className='flex cursor-pointer items-center p-3 text-sm font-light hover:text-gray-300 gap-3'>
                  <div>{item.icon}</div>
                  <div>{item.title}</div>
                </div>
              </Link>
            ))}
          </div>
          <div>
            <div className="flex justify-between p-4 ">
              <div className="p-2 flex shadow-md cursor-pointer rounded-md gap-2 items-center">
                <Sun1 size={20}onClick={toggleDarkMode} />
              </div> 
              <div className="p-2 flex shadow-md cursor-pointer rounded-md gap-2 items-center">
          <Language/>
          </div>
              <div className="p-2 flex shadow-md cursor-pointer rounded-md gap-2 items-center">
                <Moon size={20} onClick={toggleDarkMode} />
              </div>
            </div>
          </div>
          <Link to="/signin">
            <div className=' font-bold w-fit m-auto'>Log out</div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default MobileSidebar;
