import React, { useContext } from "react";
import { ActionTypes, useStore, useStoreDispatch } from "../../../store/FavoriteContext";
import PaymentTicket from "./PaymentTicket";


function TicketHistory() {
  const storeDispatch = useStoreDispatch(); // Get the dispatch function from your context
  const { state } = useStore();


  const removeFromOrderHistory = (item:any) => {
    storeDispatch({ type: ActionTypes.REMOVE_ORDER_HISTORY, payload: item._id });
  };
  
  return (
    <div>
      <h1>My Ticket</h1>
      <PaymentTicket onRemoveFromOrderHistory={removeFromOrderHistory} orderHistory={state.orderHistory} />
    </div>
  );
}

export default TicketHistory;
