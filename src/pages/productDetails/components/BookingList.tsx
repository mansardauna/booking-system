import React from "react";

interface Booking {
  startDate: Date;
  endDate: Date;
  username: string;
  event :string;
}

export const BookedDatesList: React.FC<{ bookedDates: Booking[] }> = ({ bookedDates }) => {
  return (
    <div>
      <h3>Booked Dates:</h3>
      <ul>
        {bookedDates.map((booking, index) => (
          <li key={index}>
            {booking.event}
            {booking.startDate.toDateString()} to {booking.endDate.toDateString()} - Booked by: {booking.username}
          </li>
        ))}
      </ul>
    </div>
  );
};
