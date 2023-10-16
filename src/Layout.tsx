import React, { useEffect, useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import MobileSidebar from './components/sidebar/MobileSidebar';
import Sidebar from './components/sidebar/Sidebar';
import Nav from './pages/Home/components/Nav/Nav';

function Layout() {
 
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Use useEffect to update the body class when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div className="flex">
      <div className="md:w-1/4 border-r border-white shadow-md">
      <Sidebar isDarkMode={isDarkMode} toggleDarkMode={handleToggleDarkMode} />
        <MobileSidebar isDarkMode={isDarkMode} toggleDarkMode={handleToggleDarkMode} />
      </div>
      <div className={` w-full block ${isDarkMode ? 'dark-mode' : ''}`}>
        <Nav/>
        <ScrollRestoration />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
