import { useState } from 'react';
import Layout from '../components/Layout';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import '../styles/Home.css';


function StartTest() {

  const [testId, setTestId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();


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
              value={testId}
              onChange={(e) => setTestId(e.target.value)}
              required
            />
            <button
              onClick={() => navigate(`/test-page/${testId}`)}
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
