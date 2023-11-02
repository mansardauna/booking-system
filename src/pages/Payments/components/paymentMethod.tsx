import React, { useState } from 'react';
import Modal from 'react-modal';
import Button from '../../../components/UI/Button';


interface PaymentMethodSelectionProps {
  onPaymentMethodSelected: (method: string) => void;
}

const PaymentMethodSelection: React.FC<PaymentMethodSelectionProps> = ({ onPaymentMethodSelected }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handlePaymentMethodSelected = (method: string) => {
    setSelectedMethod(method);
    onPaymentMethodSelected(method); // Pass the selected method to the parent component
  };

  return (
    <div className='md:w-1/2 m-auto p-2'>
      <div className=' text-2xl  w-fit m-auto text-center mb-2'>Select a Payment Method</div>
      <div className='flex flex-col gap-2 text-white mt-2'>
        <Button variant='primary' onClick={() => handlePaymentMethodSelected('card')}>Credit/Debit Card</Button>
        <Button variant='primary' onClick={() => handlePaymentMethodSelected('paypal')}>PayPal</Button>
        <Button variant='primary' onClick={() => handlePaymentMethodSelected('applepay')}>Apple Pay</Button>
      </div>
      <div>
        {selectedMethod && <p>Selected Payment Method: {selectedMethod}</p>}
      </div>
    </div>
  );
};





Modal.setAppElement('#root'); // Set the root element for the modal

function PaymentMethodModal() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handlePaymentMethodSelected = (method: string) => {
    setSelectedPaymentMethod(method);
    closeModal(); // Close the modal when a payment method is selected
  };

  return (
    <>
    <div className='md:w-52 md:shadow-lg md:rounded-lg md:h-40 w-full bg-transparent border p-2 cursor-pointer text-center flex md:flex-col justify-between' onClick={openModal} >
      <div className="title text-2xl ">Payment Method</div>
      <div className="">
          {selectedPaymentMethod && (
            <>
          <p className='md:block  hidden'>Selected Method: {selectedPaymentMethod}</p>
          <p className='md:hidden text-gray-400'>{selectedPaymentMethod}</p>
          </>
        )}
        </div>
  </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal} 
        contentLabel="Payment Method Modal"
        className='absolute border md:right-52 right-10 bg-white  md:w-6/12 p-2 bottom-60'
      >
        <PaymentMethodSelection onPaymentMethodSelected={handlePaymentMethodSelected} />
       
     
        <Button variant='secondary' onClick={closeModal} className="w-full text-center">close</Button>
      </Modal>
    </>
  );
}
export default PaymentMethodModal;