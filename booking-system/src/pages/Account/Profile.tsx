import React from 'react'
import TicketHistory from '../Booking/components/TicketHistory'

function Profile() {
  return (
    <div className='flex relative'>
      <TicketHistory/>
      <div className="user">User</div>
    </div>
  )
}

export default Profile