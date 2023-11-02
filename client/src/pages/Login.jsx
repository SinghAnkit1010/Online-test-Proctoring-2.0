import React from 'react';
import loginImg from '../images/Login.jpg';

function Login() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImg} alt="LOGO" />
      </div>
      <div className="bg-gray-800 flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg">
          <h2 className="text-4xl text-white font-bold text-center">Login</h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label>User Name</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
            />
          </div>

          <button className="w-full my-3 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
            Login
          </button>
          <div className="flex justify-center text-gray-400 py-2">
            <p>
              Don't have an account? Create a new {' '}
              <a className='text-red-400' href="/register">account</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
