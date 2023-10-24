import React, { useState } from "react";
import Button from "../../../components/UI/Button";
import { ActionTypes, useStore, useStoreDispatch } from "../../../store/FavoriteContext";

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

  const removeFromOrderHistory = (itemId: number) => {
    storeDispatch({ type: ActionTypes.REMOVE_ORDER_HISTORY, payload: itemId });
  };

  const toggleDatesVisibility = (itemId: number) => {
    if (selectedItemId === itemId) {
      setSelectedItemId(null); // Deselect if already selected
    } else {
      setSelectedItemId(itemId); // Select the clicked product
    }
  };

  if (state.orderHistory.length === 0) {
    return <div>No history items to display.</div>;
  }

  return (
    <div className="p-2  ">
      <div className=" ">
        {state.orderHistory.map((item: Booking) => (
          <div key={item._id}>
            <div>
              <div className="p-2 flex gap-3 border-b justify-between">
                <div className="flex justify-between gap-2">
                  <span className="w-20">{item.name}</span>
                  <span className=" text-gray-400 italic">N{item.price}</span>
                </div>

                <Button variant="primary" onClick={() => toggleDatesVisibility(item._id)} className="rounded-xl p-1 py-0 text-sm text-white">
                  {selectedItemId === item._id ? "Hide Dates" : "View Dates"}
                </Button>
                {selectedItemId === item._id && (
                  <div className="md:absolute p-2 md:w-1/4 border md:right-0 top-32 md:h-fit h-5/6 justify-between md:top-0 flex flex-col gap-5 bg-white right-4 w-11/12 fixed">
                      <div className=" md:h-56 h-80 w-full bg-slate-600 rounded-lg"></div>
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
                      <span className="text-gray-400 uppercase">Start Date</span> <span className="p-2 bg-zinc-200 rounded-lg"> {item.startDate ? item.startDate.toDateString() : "N/A"}</span></div>
                    <div className="flex justify-between items-center mt-3 ">
                       <span className="text-gray-400 uppercase"> End Date</span>
                       <span className="p-2 bg-zinc-200 rounded-lg"> {item.endDate ? item.endDate.toDateString() : "N/A"}</span>
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
                    <div className=" md:block flex gap-4 justify-center">
                    <Button variant="secondary" onClick={() => removeFromOrderHistory(item._id)} className='bg-slate-500 rounded-xl text-white md:hidden '>Back</Button>
                    <Button variant="secondary" onClick={() => removeFromOrderHistory(item._id)} className='bg-slate-200 rounded-xl md:w-full'>Delete Ticket</Button>
                    </div>

                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentTicket;
