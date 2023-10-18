import React, { useState } from 'react';

interface InfoProps {
  productInfo: any;
}

const ProductDetail: React.FC<InfoProps> = ({ productInfo }) => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [bookedDates, setBookedDates] = useState<{ startDate: Date; endDate: Date; username: string }[]>([]);
  const [isBooked, setIsBooked] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [username, setUsername] = useState('User');

  const handleStartDateChange = (date: Date | null) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setSelectedEndDate(date);
  };

  const handleBookRoom = () => {
    if (selectedStartDate && selectedEndDate) {
      // Check if the selected date range is available
      const isAvailable = bookedDates.every(
        (booking) =>
          selectedStartDate < booking.startDate || selectedEndDate < booking.startDate || selectedStartDate > booking.endDate || selectedEndDate > booking.endDate
      );

      if (isAvailable) {
        // Calculate the price based on the number of days between start and end dates
        const timeDifference = selectedEndDate.getTime() - selectedStartDate.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24);
        const price = productInfo.price * daysDifference;

        // Update the booked dates
        setBookedDates([...bookedDates, { startDate: selectedStartDate, endDate: selectedEndDate, username }]);
        setIsBooked(true);
        setCalculatedPrice(price);
      } else {
        alert('The selected date range is not available.');
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <img src={productInfo.image} alt={productInfo.name} className="w-60 h-40" />
      <h2 className="text-4xl font-semibold">{productInfo.name}</h2>
      <p className="text-xl font-semibold">${productInfo.price}</p>
      <p className="text-base text-gray-600">{productInfo.des}</p>

      {isBooked ? (
        <p>
          You booked {productInfo.name} from {selectedStartDate?.toDateString()} to {selectedEndDate?.toDateString()}. Calculated Price: ${calculatedPrice}
        </p>
      ) : (
        <div>
          <p>Select a date range to book this room:</p>
          <div>
            <label>Start Date:</label>
            <input
              type="date"
              value={selectedStartDate ? selectedStartDate.toISOString().substr(0, 10) : ''}
              onChange={(e) => handleStartDateChange(new Date(e.target.value))}
            />
          </div>
          <div>
            <label>End Date:</label>
            <input
              type="date"
              value={selectedEndDate ? selectedEndDate.toISOString().substr(0, 10) : ''}
              onChange={(e) => handleEndDateChange(new Date(e.target.value))}
            />
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button onClick={handleBookRoom}>Book Now</button>
        </div>
      )}
      <h3>Booked Dates:</h3>
      <ul>
        {bookedDates.map((booking, index) => (
          <li key={index}>
            {booking.startDate.toDateString()} to {booking.endDate.toDateString()} - Booked by: {booking.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetail;
