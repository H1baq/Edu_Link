import React from 'react';
import './Contacts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


const Contacts = () => {
  return (
    <section className="contacts" id="contacts">
      <div className="contact-container">
        <div className="contact-info">
          <h1>Contact us through:</h1>
          <p>
            <FontAwesomeIcon icon={faPhone} />{' '}
            <a href="tel:+2547456788">+2547-456788</a>
          </p>         
          <p>
            <FontAwesomeIcon icon={faEnvelope} />{' '}
            <a href="mailto:Edulink@gmail.com">Edulink@gmail.com</a>
          </p>       
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Nairobi, Kenya
          </p>       
        </div>

        <form className="contact-form">
          <h2>Send us a message</h2>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea rows="5" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
  
};

export default Contacts;
