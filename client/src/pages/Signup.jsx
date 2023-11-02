import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginImg from '../images/Login.jpg';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { message } from 'antd';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const { password, confirmPassword} = formData;
      if (password !== confirmPassword) {
        message.error('Password does not match');
        dispatch(hideLoading());
        return;
      }
      const res = await axios.post('/api/v1/student/register', formData);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success('Registered Successfully');
        navigate('/login');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something went wrong');
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImg} alt="LOGO" />
      </div>
      <div className="bg-gray-800 flex flex-col justify-center">
        <form
          onSubmit={handleFormSubmit}
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
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
              name="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full my-3 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
          >
            Register
          </button>
          <div className="flex justify-center text-gray-400 py-2">
            <p>
              Already have an account? Go to{' '}
              <Link className="text-red-400" to="/login">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
