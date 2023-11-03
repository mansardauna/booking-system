import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button';
import useFetchProducts from '../../Hooks/useFetchProduct';
interface LoginProps{
  onClick : any
}

const Login:React.FC<LoginProps> = ({onClick}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>(''); // Change to a string

  const { login } = useFetchProducts(); // Get the login function from the custom hook

  const handleLogin = () => {
    const user = { username, password };
    onClick()
    // Clear any previous error
    setError('');

    login(user)
      .then(() => {
        // Handle any post-login logic if needed
      })
      .catch((error: Error) => {
        // Handle login errors and update the error state
        setError(error.message); // Set the error message received from the API
      });
  };

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
      <Button variant='primary' onClick={handleLogin} className="w-fit rounded text-white">Login</Button>
      <div className="">
      {error && <p className="error">{error}</p>}</div>
      <div className="signup"> 
      doesn't have an Account
      <Link to='/signup' className=' text-blue-500 font-semibold'> Sign up</Link></div>
      </div>
    </div>
    </div>
  );
};

export default Login;
