import React, { useState } from 'react'
import Button from '../../../components/UI/Button'

interface BookingData{
  booking:any;
}

const UserTicket:React.FC<BookingData> =({booking}) => {
  const [toggle, setToggle] = useState (false)

  const handleToggle = () => {
    setToggle(!toggle); // Toggle the state between true and false
  };
  return (
    <div>
      <div className=" w-11/12'">
        <div className=" w-fit m-auto text-2xl font-light mb-2">Booked Tickets</div>
        {booking.map((ticket:any) =>(
          <>
          <div className="flex mt-2 gap-4" key={ticket.id}>
            <div className="w-16">{ticket.username}</div>
            
            <Button variant='primary'  className="py-0 rounded-md text-white " onClick={handleToggle}>Ticket Detail</Button>
          </div>
          <div className="">
              {toggle && (
                <div className=" shadow-md rounded-md p-2">
                    <div className="flex gap-2">
                    <div className=" uppercase w-40">Event type</div>
                    <div className="">{ticket.event}</div>
                    </div>
                    <div className="flex gap-2">
                    <div className=" uppercase w-40">Start date</div>
                    <div className="">{ticket.startDate}</div>
                    </div>
                    <div className="flex gap-2">
                    <div className=" uppercase w-40">End date</div>
                    <div className="">{ticket.endDate}</div>
                    </div>                  <div className="flex gap-2">
                    <div className=" uppercase w-40">Booked by</div>
                    <div className="">{ticket.username}</div>
                    </div>
                </div>
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

export default UserTicket