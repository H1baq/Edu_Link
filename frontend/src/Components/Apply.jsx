import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Apply.css';

const Apply = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);

  // Redirect if not logged in
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetch('http://localhost:5000/api/programs')
      .then(res => res.json())
      .then(data => setPrograms(data));
  }, []);

  const userEmail = localStorage.getItem('userEmail');

  const formik = useFormik({
    initialValues: {
      full_name: '',
      email: userEmail || '',
      program_id: '',
    },
    validationSchema: Yup.object({
      full_name: Yup.string().required('Full name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      program_id: Yup.string().required('Please select a program'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const res = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      alert(data.message);
      resetForm();
    },
  });

  return (
    <div className="apply-form">
      <h2>Apply for a Program</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          onChange={formik.handleChange}
          value={formik.values.full_name}
        />
        {formik.errors.full_name && <p>{formik.errors.full_name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          disabled
        />
        {formik.errors.email && <p>{formik.errors.email}</p>}

        <select
          name="program_id"
          onChange={formik.handleChange}
          value={formik.values.program_id}
        >
          <option value="">Select Program</option>
          {programs.map((program) => (
            <option key={program.id} value={program.id}>
              {program.title}
            </option>
          ))}
        </select>
        {formik.errors.program_id && <p>{formik.errors.program_id}</p>}

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default Apply;
