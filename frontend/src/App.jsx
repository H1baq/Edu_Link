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




const App = () => {
  return (
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
        <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />


      </Routes>
      <Footer />
    </>
  );
};

export default App;
