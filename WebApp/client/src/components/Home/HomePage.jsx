// external
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// internal
// components
import Navbar from './Navbar.jsx';
// context

function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='home-page'>
      <Navbar />
    </div>
  );
}

export default HomePage;
