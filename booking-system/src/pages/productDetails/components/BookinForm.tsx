// BookingForm.tsx
import React, { useState } from "react";
import { ArrowRight } from "iconsax-react";
import DatePicker from "react-datepicker";
import moment from "moment";
import Button from "../../../components/UI/Button";

interface BookingFormProps {
  event: string;
  username: string;
  phoneNumber: string;
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  handleStartDateChange: (date: Date | null) => void;
  handleEndDateChange: (date: Date | null) => void;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setEventName: React.Dispatch<React.SetStateAction<string>>;
  handleBookRoom: () => void;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}

const BookingForm: React.FC<BookingFormProps> = ({
  event,
  username,
  phoneNumber,
  selectedStartDate,
  selectedEndDate,
  handleStartDateChange,
  handleEndDateChange,
  setPhoneNumber,
  setUsername,
  setEventName,
  handleBookRoom,
}) => {
  return (
    <div className="m-auto h-5/6 gap-3 flex flex-col p-2 rounded-md">
      <div className="text-2xl font-light mx-auto w-fit uppercase">
        Booking form
      </div>
      <div className="border p-2 rounded-lg mt-5 border-gray-400 flex flex-col gap-3">
        <div className="flex gap-2 items-center p-2 justify-between">
          <label>Event Name</label>
          <input
            type="text"
            value={event}
            onChange={(e) => setEventName(e.target.value)}
            className="border p-2 w-40 rounded-md border-gray-400 uppercase bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="start w-fit m-auto">Start Date and Time</div>
          <DatePicker
            className="m-auto w-fit p-2 border rounded-md"
            selected={selectedStartDate}
            onChange={handleStartDateChange}
            showTimeSelect
            dateFormat="yyyy-MM-dd h:mm aa"
            timeFormat="HH:mm"
            minDate={new Date()}
            locale="en"
            placeholderText="Pick date and time"
          />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="start w-fit m-auto">End Date and Time</div>
          <DatePicker
            className="m-auto w-fit p-2 border rounded-md"
            selected={selectedEndDate}
            onChange={handleEndDateChange}
            showTimeSelect
            dateFormat="yyyy-MM-dd h:mm aa"
            timeFormat="HH:mm"
            minDate={new Date()}
            locale="en"
            placeholderText="Pick date and time"
          />
        </div>
        <div className="flex gap-2 items-center p-2 justify-between">
          <label>Book By</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded-md w-40 uppercase bg-transparent border-gray-400"
          />
        </div>
        <div className="flex gap-2 items-center p-2 justify-between">
          <label>Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border p-2 rounded-md w-40 uppercase bg-transparent border-gray-400"
          />
        </div>
      </div>
      <Button
        variant="primary"
        className="bg-slate-800 p-2 flex w-fit text-white rounded-md m-auto mt-4 items-center gap-2 justify-between"
        onClick={handleBookRoom}
      >
        <div>Proceed to payment</div>
        <ArrowRight size={16} />
      </Button>
    </div>
  );
};

export default BookingForm;
