import React from 'react';
import './Programs.css';
import undergradesImg from "../assets/programs1.jpg";
import mastersImg from "../assets/Programs2.jpg";
import certificateImg from "../assets/certificate.jpg"
import onlineImg from "../assets/online.jpg"

const programsData = [
  {
    title: 'Undergraduate',
    description: 'Explore our diverse undergraduate programs designed to build a strong academic foundation.',
    image:undergradesImg
  },
  {
    title: 'Masters',
    description: 'Advance your knowledge and career with our specialized master’s degree programs.',
    image:mastersImg
  },
  {
    title: 'Certificate Courses',
    description: 'Short, skill-based certifications for professional and personal development.',
    image:certificateImg
  },
  {
    title: 'Online Learning',
    description: 'Flexible online courses accessible from anywhere, anytime.',
    image:onlineImg
  }
];

const Programs = () => {
  return (
    <section className="programs" id="programs">
      <h2>Our Programs</h2>
      <div className="program-cards">
        {programsData.map((program, index) => (
          <div className="program-card" key={index}>
            {program.image && <img src={program.image} alt={program.title} className="program-img" />}
            <h3>{program.title}</h3>
            <p>{program.description}</p>
            <a href="/apply" className="enroll-btn">Enroll Now</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Programs;