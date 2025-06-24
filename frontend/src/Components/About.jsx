import React from 'react';
import './About.css';
import aboutImage from '../assets/Home.jpg'; 

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-text">
          <h2>About EduLink</h2>
          <p>
            EduLink is dedicated to connecting learners with top-quality educational opportunities.
            We offer a range of academic programs and resources to help you succeed in your learning journey.
          </p>
        </div>
        <div className="about-image">
          <img src={aboutImage} alt="About EduLink"/>
        </div>
      </div>
    </section>
  );
};

export default About;
