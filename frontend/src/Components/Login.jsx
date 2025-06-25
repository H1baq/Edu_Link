import { useState } from 'react';
import './Login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
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
  };

  return (
    <div className="login">
      <h2>Check Your Application</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <button type="submit">View Applications</button>
      </form>

      {error && <p>{error}</p>}

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

export default Login;
