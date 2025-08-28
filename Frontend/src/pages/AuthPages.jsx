import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

const AuthPages = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Show register page if path includes 'register'
  if (location.pathname.includes('register')) {
    return <Register />;
  }

  // Default to login page
  return <Login />;
};

export default AuthPages;
