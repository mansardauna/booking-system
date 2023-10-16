
import React from 'react'
import CurrentLocation from './CurrentLocation'
import Filters from './Filter'
import Language from './Language'
import Profile from './Profile'
import Search from './Search'


interface NavProp{

}


const Nav:React.FC<NavProp>=() =>{
  return (
    < div className='border-b border-primary md:border-none shadow-md p-2 '>
    <div className='md:hidden flex mt-14 w-10/12 items-center gap-2 m-auto'>
      <Search/>
      <Filters/>
      </div>

    <div className='relative m-auto w-full items-center justify-center grid grid-cols-3 gap-2 md:mt-0 mt-2 md:gap-5 p-2 md:p-5 md:flex'>
      <CurrentLocation />
      <Language />
      <Profile />
    </div>
    </div>
  )
}

export default Nav