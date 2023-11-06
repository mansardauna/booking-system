import React, { useState } from 'react';
import axios from 'axios';
import useFetchProducts from '../../Hooks/useFetchProduct';
import Button from '../../components/UI/Button';
import { Link } from 'react-router-dom';
import { Lock, User } from 'iconsax-react';

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
    <div className=' mt-5 p-2 w-fit m-auto border'>
      <div className="login w-fit m-auto text-3xl text-primary mb-3">Sign up</div>
    <div className="m-auto p-2">
<div className="flex flex-col gap-10 items-center">
<div className="username flex flex-col gap-2">
    <div className="label text-xl flex w-10/12 m-auto items-center gap-3 border-b border-primary font-light">
      <User/>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} className="p-2  rounded-md outline-none w-1/2"
      />
      </div>

      </div>
      <div className="password flex flex-col gap-2">
    <div className="label border-b w-10/12 m-auto text-xl gap-3 flex items-center border-primary">
      <Lock/>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2  rounded-md outline-none w-1/2"
      />
      </div>
      </div>
      <Button variant='primary' onClick={handleSignUp} className="w-10/12 rounded text-white">Sign up</Button>
    <div className="">
    {error && <p className="error">{error}</p>}</div>
    <div className="signup font-light"> 
    Already have an Account?
    <Link to='/signin' className=' text-primary ml-2'> Login</Link></div>
    </div>
  </div>
  </div>
  );
};

export default SignUp;
