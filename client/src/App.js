import './App.css';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route from react-router-dom, not BrowserRouter
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PublicRoute from './components/PublicRoute.jsx';
import StartTest from './pages/StartTest';
import CreateTest from './pages/CreateTest';
import TestPage from './pages/TestPage';
import Profile from './pages/Profile';
import Result from './pages/Result';

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          {/* home */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          <Route
            path="/start-test"
            element={
              <ProtectedRoute>
                <StartTest />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-test"
            element={
              <ProtectedRoute>
                <CreateTest />
              </ProtectedRoute>
            }
          />

          <Route
            path="/test-page/:testId"
            element={
              <ProtectedRoute>
                <TestPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />


          <Route
            path="/result/:testId"
            element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            }
          />

          
        </Routes>
      )}
    </>
  );
}

export default App;
