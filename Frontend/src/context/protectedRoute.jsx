import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext.jsx';

export const ProtectedRoute = ({ children }) => {
   const { isAuthenticated, loading } = useAuth();

   if (loading) {
      return <div>Loading...</div>;
   }

   return isAuthenticated ? children : <Navigate to="/login" />
};

export default ProtectedRoute;