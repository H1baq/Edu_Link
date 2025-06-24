import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">EduLink</div>

      <div className="hamburger" onClick={toggleMenu}>
        &#9776; {/* This is the ☰ icon */}
      </div>

      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#programs">Programs</a></li>
        <li><a href="#contacts">Contacts</a></li>
      </ul>
    </nav>  
  );
};

export default Navbar;
