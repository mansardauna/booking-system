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
      <div className={`md:w-1/5 shadow-xl border-none border-r z-50 fixed bg-primary  ${isDarkMode ? 'sidebar' : ''}`}>
      <Sidebar toggleDarkMode={handleToggleDarkMode} />
        <MobileSidebar isDarkMode={isDarkMode} toggleDarkMode={handleToggleDarkMode} />
      </div>
      <Nav isDark={isDarkMode}/>

      <div className={` md:ml-[20%] md:mt-[5%] mt-[40%] w-full block ${isDarkMode ? 'dark-mode' : ''}`}>
        <ScrollRestoration />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
