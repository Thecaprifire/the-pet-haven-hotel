import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';

const Registration = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <main className="mt-16 p-4 pt-20"> {/* Add margin-top and padding */}
      <div className="flex flex-col items-center">
        <div className="max-w-2xl w-full my-3">
          <h2 className="text-6xl font-bold">{isLogin ? 'Login' : 'Sign Up'}</h2>
          {isLogin ? <Login /> : <Signup />}
          <button onClick={toggleForm} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded ">
            {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Registration;