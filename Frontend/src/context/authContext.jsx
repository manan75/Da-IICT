import { createContext, useContext, useEffect, useState } from 'react';
import API from '../API/api.jsx';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
         verifyToken(savedToken);
      } else {
         setLoading(false);
      }
   }, []);

   
   const verifyToken = async (token) => {
      try {
         const response = await API.post('/auth/verify-token', {}, {
            headers: {
               Authorization: token
            }
         });
         setUser(response.data.user); // Extract user from response
         setIsAuthenticated(true);
      } catch (error) {
         console.error('Token verification failed:', error);
         logout();
      } finally {
         setLoading(false);
      }
   };


   const login = (token) => {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      setLoading(false);
      verifyToken(token); // Fetch user data after login
   };

   const logout = () => {
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
   };


   const value = {
      isAuthenticated,
      user,
      loading,
      login,
      logout
   };

   return (
      <AuthContext.Provider value={value}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
};