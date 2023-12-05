import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { useState } from 'react';
import ConfirmationModal from './ConfirmationPage';
import { hideLoading } from '../redux/features/alertSlice';
import logo from "../images/icons8.png"

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const { user } = useSelector((state) => state.user);

  const showLogoutConfirmationModal = () => {
    setShowLogoutConfirmation(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(hideLoading());
    navigate('/');
    window.location.reload();
  };

  const handleLogoutConfirmation = () => {
    handleLogout();
    setShowLogoutConfirmation(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirmation(false);
  };

  return (
    user && (
      <>
        <div className="flex justify-between items-center bg-gradient-to-r from-[#0069DC] to-[#594177] p-3 max-h-25 ">
          <h1 className="text-2xl text-white">
            <a href='/'><img src={logo} alt="Proctopous" style={{ display:"inline-block", width: '3rem' }} />  Proctopous</a>
          </h1>
          <div className="flex items-center justify-end ">
            <ul className="flex gap-6 list-none mr-8">
              <li>
                <a
                  href={location.pathname === '/' ? '#' : '/'}
                  className="text-white text-xl hover:text-gray-600 no-underline hover:bg-gray-200 p-1 hover:rounded"
                >
                  Home
                </a>
              </li>
          
              <li>
                <a
                  href="/about"
                  className="text-white text-xl hover:text-gray-600 no-underline hover:bg-gray-200 p-1 hover:rounded"
                  onClick={(e) => {
                    navigate('/about');
                    window.location.reload();
                  }}
                >
                  About Us
                </a>
              </li>


              <li>
                <a
                  href={user.isInstitution ? '/institution-dashboard' : '/student-dashboard'}
                  className="text-white text-xl hover:text-gray-600 no-underline hover:bg-gray-200 p-1 hover:rounded"
                >
                  Dashboard
                </a>
              </li>
            </ul>

            <div className="bg-white px-2 py-3 rounded flex gap-1 items-center">
              <i className="ri-user-2-fill"></i>
              <span
                className="underline cursor-pointer"
                onClick={() => {
                  navigate('/profile');
                }}
              >
                {user.name}
              </span>

              <i
                className="ri-logout-circle-r-line ml-2 cursor-pointer"
                onClick={showLogoutConfirmationModal}
              ></i>
            </div>
          </div>
        </div>
        <div className='min-h-[80vh]'>
          {children}
        </div>
        <Footer />
        <ConfirmationModal
          visible={showLogoutConfirmation}
          onConfirm={handleLogoutConfirmation}
          onCancel={handleLogoutCancel}
        />
      </>
    )
  );
};

export default Layout;
