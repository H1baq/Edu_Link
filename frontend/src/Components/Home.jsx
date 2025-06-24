import React from 'react';
import './Home.css';
import heroImage from '../assets/About.jpg';

const Home = () => {
  return (
    <section className="hero" id="Home">
      <img src={heroImage} alt="Background" className="hero-bg" />
      
      <div className="hero-content">
        <h1><strong>Welcome to EduLink</strong></h1>
        <p><strong>Your gateway to quality education and opportunities.</strong></p>
        <a href="#programs" className="btn">Explore Programs</a>
      </div>
    </section>
  );
};

export default Home;
