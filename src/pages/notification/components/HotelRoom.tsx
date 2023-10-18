import React, { useState } from 'react';

// Define the Room type
type Room = {
  id: number;
  name: string;
  price: number;
  image: string;
  rate: string;
};

function HotelRoom() {
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(undefined);
  
  // Function to book the selected room
  const bookRoom = (room: Room) => {
    // Check if the room is defined before booking
    if (room) {
      console.log(`Booking room: ${room.name}`);
      // You can perform booking logic here
    } else {
      console.log('No room selected.');
    }
  };

  // Function to handle room selection
  const handleRoomSelection = (room: Room) => {
    setSelectedRoom(room);
  };

  // Render the room selection and booking components
  return (
    <div className='mt-20'>
      <h1>Hotel Rooms</h1>
      {selectedRoom ? (
        <div>
          <h2>Selected Room: {selectedRoom.name}</h2>
          <button onClick={() => bookRoom(selectedRoom)}>Book Room</button>
        </div>
      ) : (
        <div>
          <h2>Select a room to book</h2>
          <button onClick={() => handleRoomSelection({ id: 1, name: 'Room A', price: 100, image: 'room_a.jpg', rate: '4.5' })}>Select Room A</button>
          <button onClick={() => handleRoomSelection({ id: 2, name: 'Room B', price: 120, image: 'room_b.jpg', rate: '4.8' })}>Select Room B</button>
        </div>
      )}
    </div>
  );
}

export default HotelRoom;

