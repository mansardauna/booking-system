import React, { useState } from 'react';
import axios from 'axios';
import useFetchProducts from '../../Hooks/useFetchProduct';
import Button from '../../components/UI/Button';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { fetchUserData,loading,
    error, } = useFetchProducts(); // Use the custom hook

  const handleSignUp = () => {
    // Create a user object with the entered username and password
    const user = {
      username,
      password,
    };

    // Call the fetchUserData function from the custom hook
    fetchUserData(user)
      .then((userData) => {
        console.log('User data:', userData);
        // You can handle the user data as needed in your application
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className=' mt-5 p-2'>
    <div className="m-auto w-6/12 border p-2">
<div className="flex flex-col gap-4 items-center">
<div className="username flex flex-col gap-2">
  <div className="label text-2xl font-light">Username</div>
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)} className="p-2 border rounded-md"
    />
    </div>
    <div className="password flex flex-col gap-2">
  <div className="label">Password</div>
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="p-2 border rounded-md"
    />
    </div>
    <Button variant='primary' onClick={handleSignUp} className="w-fit rounded text-white">Sign up</Button>
    <div className="">
    {error && <p className="error">{error}</p>}</div>
    <div className="signup"> 
    Already have an Account
    <Link to='/signin' className=' text-blue-500 font-semibold'> Login</Link></div>
    </div>
  </div>
  </div>
  );
};

export default SignUp;
