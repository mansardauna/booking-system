
import React from 'react'
import CurrentLocation from './CurrentLocation'
import Filters from './Filter'
import Language from './Language'
import Search from './Search'


interface NavProp{

}


const Nav:React.FC<NavProp>=() =>{
  return (
    <div className='relative m-auto items-center justify-between grid grid-cols-2 gap-2 mt-5 md:mt-0 md:gap-5 md:flex p-5 shadow-lg'>
      <Filters/>
      <Search />
      <CurrentLocation />
      <Language />
      <div></div>
    </div>
  )
}

export default Nav