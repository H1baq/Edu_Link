import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Programs from './Components/Programs';
import About from './Components/About';
import Contacts from './Components/Contacts';
import Apply from './Components/Apply';
import Footer from './Components/Footer';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/apply" element={<Apply />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
