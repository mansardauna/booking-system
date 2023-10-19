import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import MapWithLocationTracker from './pages/Account/Location';
import Profile from './pages/Account/Profile';
import SignUp from './pages/Account/SignUp';
import SingIn from './pages/Account/SingIn';
import BookingForm from './pages/Booking/components/BookingForm';
import Favourite from './pages/Favourite/Favourite';
import Home from './pages/Home/Home';
import HotelRoom from './pages/notification/components/HotelRoom';
import Notification from './pages/notification/components/Notification';
import Detail from './pages/productDetails/components/Detail';
import ProductDetail from './pages/productDetails/ProductDetails';
import { CartProvider, FavProvider, StoreProvider } from './store/FavoriteContext';
import FavouriteList from './store/FavouriteList';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/product/:_id" element={<Detail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/hotel" element={<HotelRoom />} />

        <Route path="/signin" element={<SingIn />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/fav" element={<FavouriteList />} />
        <Route path="/user" element={<Profile />} />
        <Route path="/location" element={<MapWithLocationTracker />} />
        <Route path='/favourite' element={<FavouriteList/>} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <div>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </div>
  );
}

export default App;
