import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Programs from './Components/Programs';
import About from './Components/About';
import Contacts from './Components/Contacts';
import Apply from './Components/Apply';
import Footer from './Components/Footer';
import Login from './Components/Login';
import AdminDashboard from './Components/AdminDashboard';
import CheckStatus from './Components/Checkstatus';
import EnrollLogin from './Components/EnrollLogin'; // ✅ Correct import
import { createContext, useState } from 'react';

export const LoginContext = createContext();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, redirectPath, setRedirectPath }}>
      <>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <About />
                <Contacts />
              </>
            }
          />
          <Route path="/programs" element={<Programs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/status" element={<CheckStatus />} /> {/* Renamed for clarity */}
          <Route path="/enroll-login" element={<EnrollLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </>
    </LoginContext.Provider>
  );
};

export default App;
