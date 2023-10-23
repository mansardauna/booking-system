import React from "react";

interface Booking {
  _id: number;
  startDate: any;
  endDate: any;
  username: string;
  event: string;
  name: string;
  price: number;
}

interface PaymentTicketProps {
  onRemoveFromOrderHistory: (itemId: number) => void;
  orderHistory: Booking[];
}

const PaymentTicket: React.FC<PaymentTicketProps> = ({ onRemoveFromOrderHistory, orderHistory }) => {
  if (orderHistory.length === 0) {
    return <div>No history items to display.</div>;
  }

  return (
    <div>
      <h2>History</h2>
      <ul>
        {orderHistory.map((item: Booking) => (
          <li key={item._id}>
            <div>
              <p>Start Date: {item.startDate || "N/A"}</p>
              <p>End Date: {item.endDate || "N/A"}</p>
              <p>Username: {item.username || "N/A"}</p>
              <p>Event: {item.event || "N/A"}</p>
            </div>
            <div>
              <p>Name: {item.name || "N/A"}</p>
              <p>Price: NGN{item.price || 0}</p>
              <button onClick={() => onRemoveFromOrderHistory(item._id)}>
                Remove from Favorites
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentTicket;
