import React from 'react';

export const BookingButton: React.FC<{
  startDate: Date | null;
  endDate: Date | null;
  onBook: () => void;
}> = ({ startDate, endDate, onBook }) => {
  return (
    <div className='m-auto w-fit mt-2'>
      <button onClick={onBook} disabled={!startDate || !endDate} className="p-2 border border-gray-400 hover:bg-slate-100 rounded-md cursor-pointer "> 
        Book Now
      </button>
    </div>
  );
};