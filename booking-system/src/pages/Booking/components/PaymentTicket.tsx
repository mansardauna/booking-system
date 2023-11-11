import React, { useState } from "react";
import Button from "../../../components/UI/Button";
import { ActionTypes, ActionTypes as OrebiActionTypes, useStore, useStoreDispatch } from "../../../store/FavoriteContext";

import QRCode from "qrcode.react";
import Modal from "react-modal";
import { Printer, Ticket } from "iconsax-react";

Modal.setAppElement("#root");

interface Booking {
  _id: number;
  startDate: any;
  endDate: any;
  username: string;
  event: string;
  name: string;
  price: number;
  TotalPrice: number;
}

const PaymentTicket: React.FC = () => {
  const storeDispatch = useStoreDispatch();
  const { state } = useStore();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
 

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleBack = () => {
    setSelectedItemId(null);
    closeModal();
  };

  const removeFromOrderHistory = (itemId: number) => {
    storeDispatch({ type: OrebiActionTypes.REMOVE_ORDER_HISTORY, payload: itemId });
  };
  const beforePrint = () => {
    // Hide buttons before printing
    const buttons = document.querySelectorAll(".exclude-on-print");
    buttons.forEach((button) => {
      button.classList.add("hidden");
    });
  };

  const afterPrint = () => {
    // Show buttons after printing
    const buttons = document.querySelectorAll(".exclude-on-print");
    buttons.forEach((button) => {
      button.classList.remove("hidden");
    });
  };

  const printTicket = () => {
    beforePrint();
    window.print();
    afterPrint();
  };

  const cancelBooking = (itemId: number) => {
    const canceledBooking = state.orderHistory.find((item) => item._id === itemId);
    if (canceledBooking) {
      storeDispatch({
        type: ActionTypes.ADD_CANCELED_BOOKING,
        payload: canceledBooking,
      });
      storeDispatch({ type: OrebiActionTypes.REMOVE_ORDER_HISTORY, payload: itemId });
    }
  };

  const toggleDatesVisibility = (itemId: number) => {
    if (selectedItemId === itemId) {
      setSelectedItemId(null);
    } else {
      setSelectedItemId(itemId);
    }
  };

  if (state.orderHistory.length === 0) {
    return (
      <>
        <div
          className="md:w-52 md:h-40 p-2 md:shadow-lg border text-2xl md:text-3xl bg-transparent md:text-center cursor-pointer rounded-md"
          onClick={openModal}
        >
          <div className=" items-center flex md:flex-col gap-3 md:mt-5">
            <Ticket className="md:text-5xl" />
            <span className="text-2xl"> No Ticket History</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="">
      <div
        className="md:w-52 md:h-40 p-2 md:shadow-lg border text-2xl md:text-3xl flex flex-col gap-3 bg-transparent md:text-center cursor-pointer rounded-md"
        onClick={openModal}
      >
        <div className=" items-center flex md:flex-col gap-3 md:mt-5">
          <Ticket className="md:text-5xl" />
          <span className="text-2xl">Ticket History</span>
        </div>
        <span className=" text-sm"> You have {state.orderHistory.length} Tickets</span>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="ticket  Modal"
        className="absolute border md:right-80 right-10 bg-white  md:w-5/12 h-60 overflow-auto p-2 bottom-60"
      >
        {state.orderHistory.map((item: Booking) => (
          <div key={item._id}>
            <div>
              <div className="p-2 flex gap-3 border-b justify-between">
                
                <div className="flex justify-between gap-2">
                  <span className="w-20">{item.name}</span>
                  <span className=" text-gray-400 italic">N{item.price}</span>
                </div>

                <Button
                  variant="primary"
                  onClick={() => toggleDatesVisibility(item._id)}
                  className="rounded-xl p-1 py-0 text-sm text-white"
                >
                  {selectedItemId === item._id ? "Hide Dates" : "View Dates"}
                </Button>
                {selectedItemId === item._id && (
                  <div className=" p-2 md:w-1/4 border md:right-0 top-32 md:top-16 md:h-fit h-5/6 justify-between  flex flex-col gap-5 bg-white right-4 w-11/12 fixed">
                     <Button
                        variant="secondary"
                        onClick={printTicket}
                        className="rounded-2xl absolute button left-0 bg-slate-300 shadow-md"
                      >
                        <Printer/>
                      </Button>
                    <QRCode value="YourTicketDataHere" className=" m-auto" />

                    <div className="border rounded-md p-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400 uppercase">Name</span>
                        <span className="w-20">{item.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className=" text-gray-400 uppercase">Booked For</span>
                        <span className="w-20">{item.event}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 uppercase">Booked By</span>
                        <span className="w-20">{item.username}</span>
                      </div>
                    </div>
                    <div className="">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 uppercase">Start Date</span>{" "}
                        <span className="p-2 bg-zinc-200 rounded-lg">
                          {" "}
                          {item.startDate ? item.startDate.toDateString() : "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-3 ">
                        <span className="text-gray-400 uppercase"> End Date</span>
                        <span className="p-2 bg-zinc-200 rounded-lg">
                          {" "}
                          {item.endDate ? item.endDate.toDateString() : "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="">
                      <div className="flex justify-between">
                        <span className="text-gray-400 uppercase">Price</span>
                        <span className="">NGN{item.price}/Day</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 uppercase">Total Price</span>
                        <span className="">NGN{item.TotalPrice}</span>
                      </div>
                    </div>
                    <div className=" flex flex-col gap-4 justify-center">
                      <Button
                        variant="primary"
                        onClick={() => handleBack()}
                        className="rounded-2xl shadow-md  w-full button text-white "
                      >
                        Back
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          cancelBooking(item._id);
                          handleBack();
                        }}
                        className=" rounded-2xl md:w-full button bg-slate-300 shadow-md"
                      >
                        Cancel Booking
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => 
                          removeFromOrderHistory
                        }
                        className=" rounded-2xl md:w-full bg-slate-300 shadow-md"
                      >
                        Delete Ticket
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default PaymentTicket;
