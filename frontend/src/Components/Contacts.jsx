import React from 'react';
import './Contacts.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


const Contacts = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      message: Yup.string().required('Message is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch('http://localhost:5000/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (!res.ok) {
  const error = await res.json();
  throw new Error(error.error || 'Something went wrong');
}
        const data = await res.json();
alert(data.message || 'Message sent!');
        resetForm();
      } catch (error) {
        alert('Failed to send message.');
      }
    },
  });

  return (
    <section className="contacts" id="contacts">
      <div className="contact-container">
        <div className="contact-info">
          <h1>Contact us through:</h1>
          <p><FontAwesomeIcon icon={faPhone} /> <a href="tel:+2547456788">+2547-456788</a></p>
          <p><FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:Edulink@gmail.com">Edulink@gmail.com</a></p>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Nairobi, Kenya</p>
        </div>

        <form className="contact-form" onSubmit={formik.handleSubmit}>
          <h2>Send us a message</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && <p className="error">{formik.errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && <p className="error">{formik.errors.email}</p>}

          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            onChange={formik.handleChange}
            value={formik.values.message}
          />
          {formik.errors.message && <p className="error">{formik.errors.message}</p>}

          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contacts;