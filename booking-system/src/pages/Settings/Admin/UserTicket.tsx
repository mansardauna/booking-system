import React, { useState } from 'react';
import Button from '../../../components/UI/Button';
import useFetchProducts from '../../../Hooks/useFetchProduct';
import Notification from '../../notification/components/Notification';

interface TicketData {
  booking: any[];
  productId: number;
}

const UserTicket: React.FC<TicketData> = ({ booking, productId }) => {
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [notification, setNotification] = useState<any>(null);
  const { deleteTicket, products } = useFetchProducts();
  const confirmTicket = (ticketId: number, phoneNumber: string, username: string, event: string, startDate: string, endDate: string, calculatedPrice: number) => {
    const confirmationMsg = `Confirm: Booking for ${username} - ${event}. Start Date: ${startDate}, End Date: ${endDate}. Price: NGN ${calculatedPrice}`;
    setConfirmationMessage(confirmationMsg);
  
  
    // Create the WhatsApp message link
    const message = `Confirmation for Ticket ${ticketId}: ${confirmationMsg}`;
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
    window.open(whatsappLink);
  
    setTimeout(() => {
      setConfirmationMessage('');
    }, 5000);
  };
  

  const onDeleteTicket = async (ticketId: number, productId: number) => {
    try {
      const product = products.find((p: any) => p.id === productId);

      if (product) {
        product.booking = product.booking.filter((ticket: any) => ticket.id !== ticketId);

        await deleteTicket(productId, ticketId);
        console.log(`Ticket ${ticketId} deleted`);
        setSelectedTicket(null);
      } else {
        console.error('Product not found');
      }
    } catch (error) {
      console.error(`Error deleting ticket ${ticketId}:`, error);
    }
  };

  const handleToggle = (ticketId: number) => {
    setSelectedTicket((prev) => (prev === ticketId ? null : ticketId));
  };

  const cancelTicket = (ticketId: number) => {
    console.log(`Ticket ${ticketId} canceled`);
  };

  return (
  <div>

      <div className="w-11/12">
        <div className="w-fit m-auto text-2xl font-light mb-2">Booked Tickets</div>
        <div className="h-80 overflow-auto p-2">
          {booking.map((ticket: any) => (
            <div key={ticket.id}>
              <div className="flex mt-2 gap-4">
                <div className="w-16">{ticket.username}</div>

                <Button
                  variant="primary"
                  className="py-0 rounded-md text-white"
                  onClick={() => handleToggle((ticket.id))}
                >
                  Ticket Detail
                </Button>

                <Button
  variant="primary"
  className="py-0 rounded-md text-white"
  onClick={() => confirmTicket(
    ticket.id,
    ticket.phoneNumber,
    ticket.username,
    ticket.event,
    ticket.startDate,
    ticket.endDate,
    ticket.calculatedPrice
  )}
>
  Confirm Ticket
</Button>
                <Button
                  variant="primary"
                  className="py-0 rounded-md bg-red-600 text-white"
                  onClick={() => onDeleteTicket(ticket.id, productId)}
                >
                  Delete
                </Button>

                <Button
                  variant="primary"
                  className="py-0 rounded-md text-white"
                  onClick={() => cancelTicket(ticket.id)}
                >
                  Cancel
                </Button>
              </div>

              {selectedTicket === ticket.id && (
                <div className="shadow-md rounded-md p-2">
                  <div className="flex gap-2">
                  <div className="uppercase w-40">Event type</div>
                    <div>{ticket.event}</div>
                  </div>
                  <div className="flex gap-2">
                  <div className="uppercase w-40">Phone Number</div>
                    <div>{ticket.phoneNumber}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="uppercase w-40">Start date</div>
                    <div>{ticket.startDate}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="uppercase w-40">End date</div>
                    <div>{ticket.endDate}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="uppercase w-40">Booked by</div>
                    <div>{ticket.username}</div>
                  </div>
                  <div className="">{ticket.calculatedPrice}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserTicket;
