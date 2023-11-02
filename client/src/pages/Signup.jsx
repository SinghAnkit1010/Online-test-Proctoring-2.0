import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, message } from 'antd';
import loginImg from '../images/Login.jpg';
import { hideLoading, showLoading } from '../redux/features/alertSlice';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/user/register', values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success('Registered Seccesfully');
        navigate('/login');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something wait wrong');
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImg} alt="LOGO" />
      </div>
      <div className="bg-gray-800 flex flex-col justify-center">
        <Form
          onFinish={handleSubmit}
          className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg"
        >
          <h2 className="text-4xl text-white font-bold text-center">Sign up</h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="name">Name</label>
            <input
            id="name"
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
              name="name"
              autoComplete="name"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="email">Email</label>
            <input
            id="email"
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
              name='email'
              autoComplete="email"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="password">Password</label>
            <input
            id="password"
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
              name='current-password'
              autoComplete="current-password"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="confirmPassword">confirm Password</label>
            <input
            id="confirmPassword"
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
              name='new-password'
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            className="w-full my-3 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
          >
            Login
          </button>
          <div className="flex justify-center text-gray-400 py-2">
            <p>
              Already have an account? Go to{' '}
              <Link className="text-red-400" to="/">
                Login
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default Signup;
