import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} EduLink. All rights reserved.</p>
      <div className="footer-links">
        <a href="#home">Home</a>
        <a href="#programs">Programs</a>
        <a href="#about">About</a>
        <a href="#contacts">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
