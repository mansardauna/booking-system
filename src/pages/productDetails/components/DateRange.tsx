import React from 'react';

export const DateRangePicker: React.FC<{
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}> = ({ onStartDateChange, onEndDateChange }) => {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-2 items-center md:flex gap-2'>
        <label>Start Date</label>
        <input type="date" onChange={(e) => onStartDateChange(new Date(e.target.value))} className="border p-2 rounded-md uppercase text-gray-400 bg-transparent" />
      </div>
      <div className='p-2 items-center md:flex gap-2'>
        <label >End Date</label>
        <input type="date" onChange={(e) => onEndDateChange(new Date(e.target.value))} className="border p-2 rounded-md uppercase bg-transparent text-gray-400" />
      </div>
    </div>
  );
};