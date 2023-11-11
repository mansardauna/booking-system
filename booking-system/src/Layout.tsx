import React, { useEffect, useState } from 'react';
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import AdminMobileSidebar from './components/sidebar/AdminMobileSidebar';
import AdminSidebar from './components/sidebar/AdminSidebar';
import MobileSidebar from './components/sidebar/MobileSidebar';
import Sidebar from './components/sidebar/Sidebar';
import useFetchProducts from './Hooks/useFetchProduct';
import SignIn from './pages/Account/SignIn';
import Nav from './pages/Home/components/Nav/Nav';
interface User {
  username: string;
  password: string;
}

function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { products, loading } = useFetchProducts();
const { login } = useFetchProducts()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
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

  const handleLogin = async (user: User) => {
    try {
      await login(user);
  
      // If the login is successful, navigate based on the username
      if (user.username === 'admin') {
        setIsAdmin(true);
        setIsAuthenticated(true);
        navigate('/admin');
      } else {
        setIsAdmin(false);
        setIsAuthenticated(true);
        navigate('/');
      }
    } catch (error) {
      // Handle login error (e.g., display an error message)
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex">
      {isAuthenticated && (
        <>
          {isAdmin ? (
            <div className={`md:w-1/5 shadow-xl border-none border-r z-50 fixed bg-primary ${isDarkMode ? 'sidebar' : ''}`}>
              <AdminSidebar toggleDarkMode={handleToggleDarkMode} products={products} />
              <AdminMobileSidebar isDarkMode={isDarkMode} toggleDarkMode={handleToggleDarkMode} />
            </div>
          ) : (
            <div className={`md:w-1/5 shadow-xl border-none border-r z-50 fixed bg-primary ${isDarkMode ? 'sidebar' : ''}`}>
              <Sidebar toggleDarkMode={handleToggleDarkMode} products={products} />
              <MobileSidebar isDarkMode={isDarkMode} toggleDarkMode={handleToggleDarkMode} />
            </div>
          )}
          <Nav isDark={isDarkMode} products={products} />
        </>
      )}
      <div className="md:ml-[20%] md:mt-[5%] pb-10 mt-[32%] w-full block">
        <ScrollRestoration />
        {isAuthenticated ? <Outlet /> : <SignIn onClick={handleLogin} />}
      </div>
    </div>
  );
}

export default Layout;
