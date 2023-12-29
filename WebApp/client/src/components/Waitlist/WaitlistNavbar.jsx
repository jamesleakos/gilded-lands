// external
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// internal
import SoundContext from '../../contexts/SoundContext.js';
import AuthContext from '../../contexts/AuthContext.js';
// css
import { NavbarStyled } from './styles/WaitlistNavbar.styled.js';

function Navbar() {
  const soundContext = React.useContext(SoundContext);
  const authContext = React.useContext(AuthContext);

  const logout = () => {
    soundContext.playClick();
    authContext.logout();
  };

  const [modalOn, setModalOn] = useState(false);
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 700;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  function DesktopNavbar() {
    return (
      <div className='navbar desktop-navbar'>
        {/* left links */}
        {/* <div
          className='navbar-item'
          style={{ gridColumn: 2, borderWidth: '0 1px' }}
        >
          <Link
            to='/lobby'
            className='clickable-link'
            onClick={soundContext.playClick}
          >
            Battle
          </Link>
        </div>
        <div
          className='navbar-item'
          style={{ gridColumn: 3, borderWidth: '0 1px 0 0' }}
        >
          <Link
            to='/collections'
            className='clickable-link'
            onClick={soundContext.playClick}
          >
            Realms
          </Link>
        </div> */}

        {/* title */}
        <div
          className='navbar-title'
          style={{ gridColumn: 4, borderWidth: '0 1px' }}
        >
          <h3>Legends of Leakos</h3>
        </div>

        {/* right links */}
        {/* <div
          className='navbar-item'
          style={{ gridColumn: 5, borderWidth: '0 1px' }}
        >
          <Link
            to='/test'
            className='clickable-link'
            onClick={soundContext.playClick}
          >
            Tidings
          </Link>
        </div>
        <div
          className='navbar-item'
          style={{ gridColumn: 6, borderWidth: '0 1px 0 0' }}
        >
          <Link to='/test' className='clickable-link' onClick={logout}>
            Flee
          </Link>
        </div> */}
      </div>
    );
  }

  function MobileNavbar({ toggleModal }) {
    return (
      <div className='navbar mobile-navbar'>
        {/* <div
          className='navbar-item'
          style={{ gridColumn: 1, borderWidth: '0 1px 0 0' }}
          onClick={() => {
            toggleModal();
          }}
        >
          <div className='clickable-link' onClick={soundContext.playClick}>
            <FontAwesomeIcon
              className='clickable-link icon'
              icon='fa-solid fa-bars'
            />
          </div>
        </div> */}

        {/* title */}
        <div className='navbar-title' style={{ gridColumn: 2 }}>
          <h3>Legends of Leakos</h3>
        </div>
        {/* right icon */}
        {/* <div
          className='navbar-item'
          style={{ gridColumn: 3, borderWidth: '0 0 0 1px' }}
          onClick={() => {
            toggleModal();
          }}
        >
          <div className='clickable-link' onClick={soundContext.playClick}>
            <FontAwesomeIcon
              className='clickable-link icon'
              icon='fa-solid fa-bars'
            />
          </div>{' '}
        </div> */}
      </div>
    );
  }

  return (
    <NavbarStyled>
      <div className='navbar-top'>
        {width > breakpoint ? (
          <DesktopNavbar />
        ) : (
          <MobileNavbar toggleModal={() => setModalOn(!modalOn)} />
        )}
      </div>
      {width < breakpoint && modalOn ? (
        <div className='mobile-modal'>
          <Link
            className='modal-option'
            to='/'
            onClick={() => setModalOn(false)}
          >
            Home
          </Link>
          <Link
            className='modal-option'
            to='/'
            onClick={() => setModalOn(false)}
          >
            Home Again
          </Link>
        </div>
      ) : null}
    </NavbarStyled>
  );
}

export default Navbar;
