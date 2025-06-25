import { useEffect, useState } from 'react';
import './AdminDashboard.css';


const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
fetch("http://localhost:5000/api/admin/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => setError('Failed to load dashboard data.'));
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      {!stats ? (
        <p>Loading...</p>
      ) : (
        <div className="stats">
          <p><strong>Total Programs:</strong> {stats.total_programs}</p>
          <p><strong>Total Users:</strong> {stats.total_users}</p>
          <p><strong>Total Applications:</strong> {stats.total_applications}</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
