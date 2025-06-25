// src/Components/Programs.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Programs.css';

const Programs = () => {
  const [programs, setPrograms] = useState([]);

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
            <Link to="/apply" className="enroll-btn">Enroll Now</Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Programs;
