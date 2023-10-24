import React, { createContext, ReactNode, useContext, useReducer } from "react";

interface Product {
  _id: number;
  img: string;
  name: string;
  price: number;
  quantity: number;
}
interface Booking {
  _id: number;
  startDate: any;
  endDate: any;
  username: string;
  event: string;
  name : string;
  price: number;
  TotalPrice: number;

}

interface OrebiState {
  products: Product[];
  watchlist: Product[]; 
  orders: Product[];
  orderHistory: Booking[];
}

type StoreAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "INCREASE_QUANTITY"; payload: { _id: number } }
  | { type: "DECREASE_QUANTITY"; payload: { _id: number } }
  | { type: "DELETE_ITEM"; payload: number }
  | { type: "RESET_CART" }
  | { type: "ADD_TO_WATCHLIST"; payload: Product }
  | { type: "REMOVE_FROM_WATCHLIST"; payload: number }
  | { type: "ADD_ORDER"; payload: Product }
  | { type: "REMOVE_ORDER"; payload: number }
  | { type: "INCREASE_ORDER_QUANTITY"; payload: { _id: number } }
  | { type: "DECREASE_ORDER_QUANTITY"; payload: { _id: number } }
  | { type: "DELETE_ORDER"; payload: number }
  | { type: "RESET_ORDERS" }
  | { type: "ADD_TO_ORDER_HISTORY"; payload: Booking }
  | { type: "REMOVE_ORDER_HISTORY"; payload: number };

const initialState: OrebiState = {
  products: [],
  watchlist: [],
  orders: [],
  orderHistory: [],
};

const StoreContext = createContext<{
  state: OrebiState;
  dispatch: React.Dispatch<StoreAction>;
} | undefined>(undefined);

export const ActionTypes = {
  ADD_TO_CART: "ADD_TO_CART",
  INCREASE_QUANTITY: "INCREASE_QUANTITY",
  DECREASE_QUANTITY: "DECREASE_QUANTITY",
  DELETE_ITEM: "DELETE_ITEM",
  RESET_CART: "RESET_CART",
  ADD_TO_WATCHLIST: "ADD_TO_WATCHLIST",
  REMOVE_FROM_WATCHLIST: "REMOVE_FROM_WATCHLIST",
  ADD_ORDER: "ADD_ORDER",
  REMOVE_ORDER: "REMOVE_ORDER",
  INCREASE_ORDER_QUANTITY: "INCREASE_ORDER_QUANTITY",
  DECREASE_ORDER_QUANTITY: "DECREASE_ORDER_QUANTITY",
  DELETE_ORDER: "DELETE_ORDER",
  RESET_ORDERS: "RESET_ORDERS",
  ADD_TO_ORDER_HISTORY: "ADD_TO_ORDER_HISTORY",
  REMOVE_ORDER_HISTORY: "REMOVE_ORDER_HISTORY",
} as const;

const storeReducer: React.Reducer<OrebiState, StoreAction> = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_WATCHLIST: {
      const updatedWatchlist = [...state.watchlist, action.payload];
      return { ...state, watchlist: updatedWatchlist };
    }

    case ActionTypes.REMOVE_FROM_WATCHLIST: {
      // Remove the item from the watchlist based on the item's _id
      const updatedWatchlist = state.watchlist.filter((item) => item._id !== action.payload);
      return { ...state, watchlist: updatedWatchlist };
    }

    case ActionTypes.ADD_TO_ORDER_HISTORY: {
      const updateHistory = [...state.orderHistory, action.payload];
      return { ...state, orderHistory: updateHistory };
    }

    case ActionTypes.REMOVE_ORDER_HISTORY: {
      const updateHistory = state.orderHistory.filter((item) => item._id !== action.payload);
      return { ...state, orderHistory: updateHistory };
    }

    // Add cases for other actions

    default:
      return state;
  }
};

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

export const useStoreDispatch = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStoreDispatch must be used within a StoreProvider");
  }
  return context.dispatch;
};
