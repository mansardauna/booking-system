import React from 'react';

export const DateRangePicker: React.FC<{
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}> = ({ onStartDateChange, onEndDateChange }) => {
  return (
    <div className='flex flex-col'>
      <div className='p-2 items-center flex gap-2 justify-between'>
        <label>Start Date</label>
        <input type="date" onChange={(e) => onStartDateChange(new Date(e.target.value))} className="border p-2 rounded-md uppercase  bg-transparent border-gray-400" />
      </div>
      <div className='p-2 items-center flex justify-between gap-2'>
        <label >End Date</label>
        <input type="date" onChange={(e) => onEndDateChange(new Date(e.target.value))} className="border p-2 rounded-md uppercase bg-transparent  border-gray-400" />
      </div>
    </div>
  );
};