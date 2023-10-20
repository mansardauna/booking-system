// PaymentModal.js
import React from "react";
import Modal from "react-modal";
import Button from "../../../components/UI/Button";
import PaymentComponent from "./CardPayment";
interface Payment{
  isOpen:any;
  onRequestClose:any;
  productName:string;
  calculatedPrice:any;
}
const PaymentModal:React.FC<Payment> = ({ isOpen, onRequestClose, productName, calculatedPrice }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Payment Modal"
      className="md:w-2/6 right-4 z-50 bottom-40 md:right-80 absolute gap-3 bg-primary text-white p-4 rounded-md shadow-md flex flex-col"
    >
      <div className="w-fit m-auto mt-0 uppercase text-2xl font-light ">Complete Your Booking</div>
      <PaymentComponent productName={productName} calculatedPrice={calculatedPrice} />
      <Button variant="secondary" onClick={onRequestClose} className="p-2 w-fit m-auto rounded-lg text-xs">Close</Button>
    </Modal>
  );
};

export default PaymentModal;
