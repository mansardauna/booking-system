import React, { useContext } from "react";
import { ActionTypes, useStore, useStoreDispatch } from "../../../store/FavoriteContext";
import PaymentTicket from "./PaymentTicket";


function TicketHistory() {
  return (
    <div>
      <div className="w-fit m-auto text-2xl font-light">My Ticket</div>
      <PaymentTicket />
    </div>
  );
}

export default TicketHistory;
