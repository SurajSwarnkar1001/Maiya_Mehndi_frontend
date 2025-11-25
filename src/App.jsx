import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Services from './components/Services';
import Founders from './components/Founders';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';

const LandingPage = () => (
  <>
    <Hero />
    <div id="gallery"><Gallery /></div>
    <div id="services"><Services /></div>
    <div id="founders"><Founders /></div>
    <div id="contact"><Contact /></div>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
