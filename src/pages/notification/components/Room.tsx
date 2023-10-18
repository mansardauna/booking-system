// Room.tsx
import React from 'react';

interface RoomProps {
  room: {
    id: number;
    name: string;
    price: number;
    capacity: number;
  };
  onBook: (room: any) => void;
}

const Room: React.FC<RoomProps> = ({ room, onBook }) => {
  return (
    <div className="room">
      <h2>{room.name}</h2>
      <p>Price: ${room.price} per night</p>
      <p>Capacity: {room.capacity} people</p>
      <button onClick={() => onBook(room)}>Book</button>
    </div>
  );
};

export default Room;
