import React, { createContext, ReactNode, useContext, useReducer } from "react";

interface Product {
  _id: number;
  img: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrebiState {
  products: Product[];
  watchlist: Product[];
  orders: Product[];
  orderHistory: Product[];
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
  | { type: "ADD_TO_ORDER_HISTORY"; payload: Product }
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
    case ActionTypes.ADD_TO_CART: {
      const itemIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex !== -1) {
        state.products[itemIndex].quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      return { ...state };
    }

    case ActionTypes.INCREASE_QUANTITY: {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += 1;
      }
      return { ...state };
    }

    // Add cases for other actions

    default:
      return state;
  }
};

interface StoreProviderProps{
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
