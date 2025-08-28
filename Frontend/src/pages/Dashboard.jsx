import { useAuth } from '../context/authContext.jsx';

const Dashboard = () => {
  const { user, logout } = useAuth();
  // console.log(user)
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h3>Welcome, {user?.name || 'User'}!</h3>
        <p>Email: {user?.email}</p>
        <p>You are successfully logged in.</p>
      </div>
      
      <div>
        <h3>User Information</h3>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
      
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
