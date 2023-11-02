import React from 'react';
import { useStore } from '../../../store/FavoriteContext';

const AdminPanel: React.FC = () => {
  const { state } = useStore();

  const countWishlistUsers = (productId: number) => {
    const users = new Set<string>();
    state.watchlist.forEach((item:any) => {
      if (item._id === productId) {
        users.add(item.username);
      }
    });
    return users.size;
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Number of Users in Wishlist</th>
          </tr>
        </thead>
        <tbody>
          {state.products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{countWishlistUsers(product._id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Order History</h2>
      {state.products.map((product) => (
        <div key={product._id}>
          <h3>{product.name} Order History</h3>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {state.orderHistory
                .filter((order) => order.event === product.name)
                .map((order) => (
                  <tr key={order._id}>
                    <td>{order.username}</td>
                    <td>{order.startDate}</td>
                    <td>{order.endDate}</td>
                    <td>${order.price}</td>
                    <td>${order.TotalPrice}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
