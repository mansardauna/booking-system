// BookingSummary.tsx
import React from "react";
import { ArrowRight } from "iconsax-react";
import Button from "../../../components/UI/Button";

interface BookingSummaryProps {
  username: string;
  event: string;
  phoneNumber:string;
  formattedStartDate: string | null;
  formattedEndDate: string | null;
  calculatedPrice: number;
  handlePayment: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  username,
  event,
  phoneNumber,
  formattedStartDate,
  formattedEndDate,
  calculatedPrice,
  handlePayment,
}) => {
  return (
    <div className="rounded-md gap-1 m-auto h-full md:p-4 p-2 cursor-pointer">
      <div className="w-fit m-auto text-2xl font-light mb-2">Booking summary</div>
      <div className="border border-gray-400 p-4 rounded-xl">
        <div className="w-full flex gap-2 items-center justify-between">
          <div className="text-xs md:text-base text-gray-600">Name</div>
          <div className="uppercase md:text-lg">{username}</div>
        </div>
        <div className="flex w-full justify-between p-2 items-center">
        <div className="text-xs md:text-base text-gray-600">Phone Number</div>
          <div className="uppercase md:text-sm">{phoneNumber}</div>
          </div>
            
        <div className="w-full flex gap-2 items-center justify-between">
          <div className="text-xs md:text-base text-gray-600">Event Type</div>
          <div className="uppercase md:text-lg">{event}</div>
        </div>
        <div className="items-center mt-3 text-gray-600 flex justify-between">
          <div className="from w-32 text-center text-gray-600">Start date</div>
          <div className="w-32 text-center text-gray-600">End date</div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="uppercase text-center">{formattedStartDate}</div>
          <ArrowRight size={16} />
          <div className="uppercase text-base text-center">{formattedEndDate}.</div>
        </div>
        <div className="items-center mt-3 text-gray-600 flex justify-between">
          Calculated Price
          <span className="text-gray-600"> NGN {calculatedPrice}</span>
        </div>
      </div>
      <Button
        variant="primary"
        className="bg-slate-800 p-2 flex w-fit text-white rounded-md m-auto mt-4 items-center gap-2 justify-between"
        onClick={handlePayment}
      >
        <div>Proceed to payment</div>
        <ArrowRight size={16} />
      </Button>
    </div>
  );
};

export default BookingSummary;
