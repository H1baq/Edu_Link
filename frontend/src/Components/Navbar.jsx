import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/programs">Programs</Link></li>
      <li><Link to="/contacts">Contacts</Link></li>
      <li><Link to="/login">Log In</Link></li>
      <li><Link to="/admin">Admin Dashboard</Link></li>


     </ul>

    </nav>  
  );
};

export default Navbar;
