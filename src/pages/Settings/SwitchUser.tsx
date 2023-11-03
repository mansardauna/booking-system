import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button';


function SwitchUser() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSwitch = () => {
  
    closeModal(); // Close the modal when a payment method is selected
  };
  return (
    <div>
<div className='md:w-52 md:shadow-lg md:rounded-lg md:h-40 w-full bg-transparent border p-2 cursor-pointer text-center text-2xl flex md:flex-col justify-between' onClick={openModal}>
  <div className=' items-center flex md:flex-col gap-3 md:mt-5'>
    <FaUserCircle className='md:text-4xl'/>
    <span>Switch to Admin</span>

  </div>
</div>
<Modal  isOpen={modalIsOpen}
        onRequestClose={closeModal} 
        contentLabel="Payment Method Modal"
        className='absolute border md:right-52 right-10 bg-white  md:w-5/12 w-9/12 p-2 bottom-60'>
          <div className=' md:text-3xl w-full text-center '>Are you sure you want to switch user</div>
          <div className="flex md:w-1/3 m-auto justify-between mt-5">
            <Button onClick={closeModal}  className="rounded-md text-white w-20" variant="primary">cancel</Button>
            <Link to='/admin'>
              <Button 
              className=" w-20 rounded-md bg-slate-200" variant='secondary' onClick={handleSwitch}>Yes</Button>
            </Link>
          </div>

</Modal>
    </div>
  )
}

export default SwitchUser