// src/Components/CheckStatus.jsx
import { useState } from 'react';
import './Login.css';

const CheckStatus = () => {
  const [email, setEmail] = useState('');
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  const handleCheck = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/users/${email}`);
      const data = await res.json();

      if (res.ok) {
        const appsRes = await fetch(`http://localhost:5000/api/applications/${data.id}`);
        const apps = await appsRes.json();
        setApplications(apps);
        setError('');
      } else {
        setApplications([]);
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to check status. Try again.');
    }
  };

  return (
    <div className="login">
      <h2>Check Application Status</h2>
      <form onSubmit={handleCheck}>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <button type="submit">Check Status</button>
      </form>

      {error && <p className="error">{error}</p>}

      {applications.length > 0 && (
        <div className="application-list">
          <h3>Your Applications:</h3>
          <ul>
            {applications.map((app, index) => (
              <li key={index}>
                <strong>{app.program_title}</strong><br />
                Status: {app.status}<br />
                Applied On: {app.applied_on}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CheckStatus;
