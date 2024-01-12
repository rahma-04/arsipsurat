import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginAPI from '../utils/LoginAPI';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAPI.login(username, password);
      onLogin(response); // Calling the onLogin function provided by the parent component
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Login
      </button>
    </form>
  );
};

const RegisterForm = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAPI.register(email, username, password);
      onRegister(response); // Calling the onRegister function provided by the parent component
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2"
        required
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2"
        required
      />
      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
        Register
      </button>
    </form>
  );
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLogin = (response) => {
    if (response.success) {
      // Display success popup and navigate to dashboard
      alert('Login berhasil');
      navigate.push('/dashboard');
    } else {
      alert(response.message);
    }
  };

  const handleRegister = (response) => {
    if (response.success) {
      // Display success popup and switch to login form
      alert('Register berhasil');
      setIsLogin(true);
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className='bg-white w-full h-screen'>
      <img
          src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?w=740&t=st=1704719148~exp=1704719748~hmac=3ca37907a27cb777f00162d9cc6568d01568c35f369b6216ab45bbee53d891cb"
          alt="Login"
          className= "mx-auto w-auto"
        />
      </div>
      <div className="flex bg-white w-full justify-center ">
        <div className='w-2/4 p-8 rounded-2xl my-auto bg-gray-100'>
        <h1 className='text-5xl font-semibold mb-2'>Hello</h1>
        <p className='text-lg font-medium text-gray-500 mb-4'>Welcome back! Please enter your details.</p>
        {isLogin ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <RegisterForm onRegister={handleRegister} />
        )}
        <div className="flex justify-center mt-2">
          <button
            onClick={() => setIsLogin((prev) => !prev)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Don't have any account? Register" : 'Back to Login'}
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;