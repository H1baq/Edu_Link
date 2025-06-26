import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginContext } from '../App';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { redirectPath, setRedirectPath } = useContext(LoginContext);
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/users/${email}`);
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('userEmail', email);

        
        const nextPath = redirectPath || '/apply';
        setRedirectPath(null);
        navigate(nextPath);
      } else {
        setError(data.error);
      }
    } catch {
      setError('Login failed.');
    }
  };

  return (
    <div className="login">
      <h2>Log In to Enroll</h2>
      {message && <p className="info">{message}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <button type="submit">Log In</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
