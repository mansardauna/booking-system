import React, { createContext, ReactNode, useContext, useReducer } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
};

type CartItem = Product & { quantity: number };

type CartState = {
  cart: CartItem[];
};

type Action =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'INCREMENT_QUANTITY'; payload: number }
  | { type: 'DECREMENT_QUANTITY'; payload: number };

const initialState: CartState = {
  cart: [],
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const itemToAdd = action.payload;
      const existingItem = state.cart.find((item) => item.id === itemToAdd.id);

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === itemToAdd.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...itemToAdd, quantity: 1 }],
        };
      }
    }
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }
    case 'INCREMENT_QUANTITY': {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    case 'DECREMENT_QUANTITY': {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    }
    default:
      return state;
  }
};

export const CartProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
