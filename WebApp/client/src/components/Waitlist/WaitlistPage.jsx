// external
import React, { useEffect } from 'react';

// internal
// css
import { WaitlistPageStyled } from './styles/WaitlistPage.styled.js';
// components
import Navbar from './WaitlistNavbar.jsx';
import EnterEmail from './EnterEmail.jsx';

function WaitlistPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <WaitlistPageStyled>
      <Navbar />
      <EnterEmail />
    </WaitlistPageStyled>
  );
}

export default WaitlistPage;
