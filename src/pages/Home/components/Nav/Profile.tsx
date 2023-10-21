import { User } from 'iconsax-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Profile() {
  return (
    <Link to='/user'>
    <div className='flex justify-center items-center'>
      <User/>
      <div className="">User</div>
    </div>
    </Link>
  )
}

export default Profile