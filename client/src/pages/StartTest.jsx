import { useState } from 'react';
import Layout from '../components/Layout';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import '../styles/Home.css';


function StartTest() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/test/start-test', formData);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        message.success('Login Successful');
        navigate('/test-page');
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
    <Layout>
      <div className="content flex justify-center items-center">
        <div>
          <form className="flex justify-between items-center">
            <label className="font-bold whitespace-nowrap" htmlFor="link">
              Paste Your Link:
            </label>
            <input
              id="link"
              className="rounded-lg w-5/6 ml-2 text-white bg-gray-500 p-2 focus:border-blue-500 focus:bg-gray-600 focus:outline-none"
              type="text"
              name="link"
              autoComplete="none"
              value={formData.link}
              onChange={handleInputChange}
              required
            />
            <button
              onClick={handleSubmit}
              className="ml-2 w-20 my-3 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
export default StartTest;
