import { Notification } from 'iconsax-react'
import React from 'react'
import { Link } from 'react-router-dom'

function NavNotifty() {
  return (
      <Link to="/notification">
    <div className='flex'>
      <Notification />
      <div className="hidden md:block">Notification</div>
    </div>
      </Link>
  )
}

export default NavNotifty