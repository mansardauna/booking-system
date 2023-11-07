import React, { useEffect, useState } from 'react';
import { Outlet, ScrollRestoration, Link, useNavigate } from 'react-router-dom';
import AdminSidebar from './components/sidebar/AdminSidebar';
import MobileSidebar from './components/sidebar/MobileSidebar';
import Sidebar from './components/sidebar/Sidebar';
import useFetchProducts from './Hooks/useFetchProduct';
import Login from './pages/Account/SignIn';
import Nav from './pages/Home/components/Nav/Nav';

function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { products, loading } = useFetchProducts(); // Use the hook to get products and loading state

  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin

  const navigate = useNavigate();

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleLogin = (user:any) => {
    setIsAuthenticated(!isAuthenticated)
    
  };

  return (
    <div className="flex">
      {isAuthenticated && (
        <div className={`md:w-1/5 shadow-xl border-none border-r z-50 fixed bg-primary ${isDarkMode ? 'sidebar' : ''}`}>
          <Sidebar toggleDarkMode={handleToggleDarkMode} products={products} />
          <MobileSidebar isDarkMode={isDarkMode} toggleDarkMode={handleToggleDarkMode} />
        </div>
      )}
      <div className={`md:w-1/5 shadow-xl border-none border-r z-50 fixed bg-primary ${isDarkMode ? 'sidebar' : ''}`}>
       <AdminSidebar toggleDarkMode={handleToggleDarkMode} products={products} />
       </div>
      <Nav isDark={isDarkMode} products={products} />

      <div className="md:ml-[20%] md:mt-[5%] pb-10 mt-[32%] w-full block">
        <ScrollRestoration />
        {isAuthenticated ? <Outlet /> : <Login onClick={handleLogin} />}
      </div>
    </div>
  );
}

export default Layout;
