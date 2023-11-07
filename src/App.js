import React, { useState } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate, // Import useNavigate hook
} from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import MapWithLocationTracker from './pages/Account/Location';
import Profile from './pages/Account/Profile';
import SignUp from './pages/Account/SignUp';
import SignIn from './pages/Account/SignIn'; // Corrected the component name
import BookingForm from './pages/Booking/components/BookingForm';
import PaymentTicket from './pages/Booking/components/PaymentTicket';
import Favourite from './pages/Favourite/Favourite';
import Home from './pages/Home/Home';
import HotelRoom from './pages/notification/components/HotelRoom';
import Notification from './pages/notification/components/Notification';
import Detail from './pages/productDetails/components/Detail';
import ProductDetail from './pages/productDetails/ProductDetails';
import ProductList from './pages/ProductList/ProductList';
import AddProductForm from './pages/Settings/Admin/AddProduct';
import Admin from './pages/Settings/Admin/Admin';
import EditProduct from './pages/Settings/Admin/EditProduct';
import Settings from './pages/Settings/Settings';
import { CartProvider, FavProvider, StoreProvider } from './store/FavoriteContext';
import FavouriteList from './pages/Favourite/components/FavouriteList';
import FavPage from './pages/Favourite/FavPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Home />
          }
        />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/product/:_id" element={<Detail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/hotel" element={<HotelRoom />} />
        <Route path='/store' element={<ProductList/>}/>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/user" element={<Profile />} />
        <Route path="/location" element={<MapWithLocationTracker />} />
        <Route path='/favourite' element={<FavPage/>} />
        <Route path='/register' element={<AddProductForm/>} />
        <Route path='/Management' element={<EditProduct/>} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/product-ticket' element={<PaymentTicket />}/>
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
