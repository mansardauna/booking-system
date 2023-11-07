import React from 'react';

export const BookingButton: React.FC<{
  startDate: Date | null;
  endDate: Date | null;
  onBook: () => void;
}> = ({ startDate, endDate, onBook }) => {
  return (
    <div className='m-auto w-fit mt-2'>
      <button onClick={onBook} disabled={!startDate || !endDate} className="p-2 shadow-md hover:bg-slate-700 
      text-white bg-gray-900 rounded-md cursor-pointer "> 
        Book Now
      </button>
    </div>
  );
}
