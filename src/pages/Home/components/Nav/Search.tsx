import { SearchNormal } from 'iconsax-react'
import React from 'react'

const Search:React.FC= () => {
  return (
    <div className='flex border border-zinc-200 items-center justify-between m-auto w-full md:w-10/12 rounded-lg bg-zinc-100 font-light text-xs text-black p-2'>
      <input placeholder='Search for Event Hall' className='bg-transparent outline-none w-11/12'/>
      <SearchNormal size={14}/>
    </div>
  )
}

export default Search