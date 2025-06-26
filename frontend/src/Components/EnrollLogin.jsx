// src/Components/EnrollLogin.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../App';
import './Login.css';

const EnrollLogin = () => {
  const [email, setEmail] = useState('');
  const { setRedirectPath } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.setItem('userEmail', email); // store email for apply form
    setRedirectPath(null);
    navigate('/apply'); // redirect to application form
  };

  return (
    <div className="login">
      <h2>Enter Email to Enroll</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <button type="submit">Continue to Application</button>
      </form>
    </div>
  );
};

export default EnrollLogin;
