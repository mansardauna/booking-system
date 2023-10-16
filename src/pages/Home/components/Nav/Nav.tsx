
import React from 'react'
import CurrentLocation from './CurrentLocation'
import Filters from './Filter'
import Language from './Language'
import Profile from './Profile'
import Search from './Search'


interface NavProp{
isDark:boolean
}


const Nav:React.FC<NavProp>=({isDark}) =>{
  return (
    < div className={`border-b pb-5 bg-white  fixed md:w-full w-full shadow-md md:shadow-none p-2 ${isDark ? 'nav' : ''}`}>
    <div className='md:hidden flex mt-14 w-10/12 items-center gap-2 m-auto'>
      <Search/>
      <Filters/>
      </div>

    <div className='relative m-auto w-full hidden items-center justify-center gap-2 md:mt-0 mt-2 md:gap-5 p-2 md:p-3  md:flex'>
      <CurrentLocation />
      <Language />
      <Profile />
    </div>
    </div>
  )
}

export default Nav