import React, { useState } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import MobileSidebar from './components/sidebar/MobileSidebar';
import Sidebar from './components/sidebar/Sidebar'
import Nav from './pages/Home/components/Nav'

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className='flex gap-4'>   
    <Sidebar/>
    <MobileSidebar/>
      <Nav />
      <ScrollRestoration />
      <Outlet />
    </div>
  )
}

export default Layout