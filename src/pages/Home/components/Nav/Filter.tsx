import { Filter } from 'iconsax-react'
import React from 'react'

function Filters() {
  return (
    <div className='flex gap-2 border border-gray-300 p-2 rounded-lg'>
    <Filter  />
    <div className='text-sm hidden md:block'>Filters</div>
    </div>
  )
}

export default Filters