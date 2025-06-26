import { useEffect, useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'Hibaqkuresh@gmail.com' && password === '123') {
      setIsAdmin(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetch("http://localhost:5000/api/admin/dashboard")
        .then((res) => res.json())
        .then((data) => setStats(data))
        .catch((err) => setError('Failed to load dashboard data.'));
    }
  }, [isAdmin]);

  return (
    <div className="admin-dashboard">
      {!isAdmin ? (
        <form onSubmit={handleLogin}>
          <h2>Admin Login</h2>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {error && <p>{error}</p>}
        </form>
      ) : !stats ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Dashboard</h2>
          <div className="stats">
            <p><strong>Total Programs:</strong> {stats.total_programs}</p>
            <p><strong>Total Users:</strong> {stats.total_users}</p>
            <p><strong>Total Applications:</strong> {stats.total_applications}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
