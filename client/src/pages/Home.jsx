import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import '../styles/Home.css';
import { showLoading, hideLoading } from '../redux/features/alertSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const routeToCreateTest = () => {
    dispatch(showLoading());
    navigate('/create-test');
    dispatch(hideLoading());
  };

  const routeToStartTest = () => {
    dispatch(showLoading());
    navigate('/start-test');
    dispatch(hideLoading());
  };

  return (
    <Layout>
      <div className='content flex justify-center items-center'>
        <div>
          {user?.isInstitution ? (
            <button className="text-center w-48 my-3 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" onClick={routeToCreateTest}>Create test</button>
          ) : (
            <button className="text-center w-48 my-3 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" onClick={routeToStartTest}>Start Test</button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
