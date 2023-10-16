import { User } from 'iconsax-react'
import React from 'react'

function Profile() {
  return (
    <div className='flex justify-center items-center'>
      <User size={16}/>
      <div className="text-sm">User</div>
    </div>
  )
}

export default Profile