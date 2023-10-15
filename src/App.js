import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import SignUp from './pages/Account/SignUp';
import SingIn from './pages/Account/SingIn';
import BookingForm from './pages/Booking/components/BookingForm';
import Favourite from './pages/Favourite/Favourite';
import Home from './pages/Home/Home';
import Notification from './pages/notification/components/Notification';


const router = createBrowserRouter(
  createRoutesFromElements(

    <Route>
      <Route path="/" element={<Layout />}>
       
        <Route index element={<Home />}></Route>
        <Route path='/booking' element={<BookingForm/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SingIn/>} />
        <Route path="/favourite" element={<Favourite/>} />
        <Route path='/Notification' element={<Notification/>} />
        
        </Route>
        </Route>
        ))

function App() {
  return (
    <div>
   <RouterProvider router={router} />
    </div>
  )
}

export default App