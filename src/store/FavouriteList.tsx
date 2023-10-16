import React from 'react';
import { useCart } from './FavoriteContext';


const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const incrementQuantity = (productId: number) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: productId });
  };

  const decrementQuantity = (productId: number) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: productId });
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {state.cart.map((item:any) => (
          <li key={item.id}>
            {item.name} - ${item.price} - Quantity: {item.quantity}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
            <button onClick={() => incrementQuantity(item.id)}>+</button>
            <button onClick={() => decrementQuantity(item.id)}>-</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
