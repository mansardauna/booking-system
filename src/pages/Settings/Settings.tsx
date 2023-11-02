import React from 'react';
import PaymentTicket from '../Booking/components/PaymentTicket';
import PaymentMethodModal from '../Payments/components/paymentMethod';
import AddProductForm from './Admin/Admin';
import EditProduct from './Admin/EditProduct';
import AdminPanel from './Admin/Panel';
import SwitchUser from './SwitchUser';

const Settings: React.FC = () => {
 
 

  return (
    <>
          <div className="m-auto w-fit mb-2 font-light md:text-3xl text-3xl ">Settings</div>

    <div className='md:grid md:grid-cols-3 md:w-9/12 m-auto mt-1 '>
      <SwitchUser/>
      <PaymentMethodModal />
      <PaymentTicket />
    </div>
    </>
  );
};

export default Settings;
