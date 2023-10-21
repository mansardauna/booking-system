import React from "react";

interface Booking {
  startDate: Date;
  endDate: Date;
  username: string;
  event: string;
}


interface SavedBookingsProps {
  bookings: Booking[];
}

const SavedBookings: React.FC<SavedBookingsProps> = ({ bookings }) => {
  return (
    <div className="mt-4">
      <h3 className="text-2xl font-semibold">Saved Bookings</h3>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>
              <div>Start Date: {booking.startDate.toDateString()}</div>
              <div>End Date: {booking.endDate.toDateString()}</div>
              <div>Event: {booking.event}</div>
              <div>Username: {booking.username}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No saved bookings yet.</div>
      )}
    </div>
  );
};

export default SavedBookings;
