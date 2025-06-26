// src/Components/Programs.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../App';
import './Programs.css';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const { isLoggedIn, setRedirectPath } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleEnrollClick = () => {
    if (isLoggedIn) {
      navigate('/apply');
    } else {
      setRedirectPath('/apply');
      navigate('/enroll-login');
    }
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/programs')
      .then((res) => res.json())
      .then((data) => setPrograms(data))
      .catch((err) => console.error("Error fetching programs:", err));
  }, []);

  return (
    <section className="programs" id="programs">
      <h2>Our Programs</h2>
      <div className="program-cards">
        {programs.map((program) => (
          <div className="program-card" key={program.id}>
            <h3>{program.title}</h3>
            <p>{program.description}</p>
            <button className="enroll-btn" onClick={handleEnrollClick}>
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Programs;
