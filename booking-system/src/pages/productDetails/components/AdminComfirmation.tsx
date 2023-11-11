import React, { useState } from "react";
import { ArrowRight } from "iconsax-react";
import Button from "../../../components/UI/Button";

interface AdminConfirmationProps {
  username: string;
  event: string;
  formattedStartDate: string | null;
  formattedEndDate: string | null;
  calculatedPrice: number;
  handlePayment: () => void
}

const AdminConfirmation: React.FC<AdminConfirmationProps> = ({
  username,
  event,
  formattedStartDate,
  formattedEndDate,
  calculatedPrice,
  handlePayment,
}) => {
  const adminWhatsAppNumber = "2348147661430"; // Replace with the admin's WhatsApp number
  const [confirmationStatus, setConfirmationStatus] = useState<string | null>(null);

  const handleConfirm = () => {
    // Send a WhatsApp message to the admin for confirmation
    sendWhatsAppMessage(
      `Confirm: Booking for ${username} - ${event}. Start Date: ${formattedStartDate}, End Date: ${formattedEndDate}. Price: NGN ${calculatedPrice}`,
      adminWhatsAppNumber
    );
    setConfirmationStatus("Waiting for admin confirmation");
  };

  const handleReject = () => {
    // Send a WhatsApp message to the admin to reject the booking
    sendWhatsAppMessage(
      `Reject: Booking for ${username} - ${event}. Start Date: ${formattedStartDate}, End Date: ${formattedEndDate}. Price: NGN ${calculatedPrice}`,
      adminWhatsAppNumber
    );
    setConfirmationStatus("Booking rejected by admin");
  };

  const sendWhatsAppMessage = (message: string, phoneNumber: string) => {
    // Create a WhatsApp link with the message and open in a new tab
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`);
  };

  return (
    
      <div className="flex flex-col justify-between mt-4">
        <div className="rounded-md gap-1 m-auto h-full md:p-4 p-2 cursor-pointer">
      <div className="w-fit m-auto text-2xl font-light mb-2">Booking summary</div>
      <div className="border border-gray-400 p-4 rounded-xl">
        <div className="w-full flex gap-2 items-center justify-between">
          <div className="text-xs md:text-base text-gray-600">Name</div>
          <div className="uppercase md:text-lg">{username}</div>
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
        {confirmationStatus ? (
          <div className="text-xl text-gray-600">{confirmationStatus}</div>
        ) : (
          <>
            <Button
              variant="primary"
              className="bg-slate-800 p-2 flex w-fit text-white rounded-md m-auto items-center gap-2"
              onClick={handleConfirm}
            >
              <div>Confirm Booking</div>
              <ArrowRight size={16} />
            </Button>
            <Button
              variant="primary" // You can style this button differently for rejection
              className="bg-red-600 p-2 flex w-fit text-white rounded-md m-auto items-center gap-2"
              onClick={handleReject}
            >
              <div>Reject Booking</div>
              <ArrowRight size={16} />
            </Button>
          </>
        )}
      </div>
  );
};

export default AdminConfirmation;
