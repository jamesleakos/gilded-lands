// external
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// internal
import SoundContext from '../../contexts/SoundContext.js';
import AuthContext from '../../contexts/AuthContext.js';
// css
import { NavbarStyled } from './styles/Navbar.styled.js';

function Navbar() {
  const navigate = useNavigate();
  const soundContext = React.useContext(SoundContext);
  const authContext = React.useContext(AuthContext);

  const logout = () => {
    soundContext.playClick();
    authContext.logout();
  };

  const [modalOn, setModalOn] = useState(false);
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1000;
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
        <div
          className='navbar-item'
          style={{ gridColumn: 2, borderWidth: '0 1px' }}
          onMouseDown={() => {
            soundContext.playClick();
            navigate('/lobby');
          }}
        >
          <div className='clickable-link'>Battle</div>
        </div>
        <div
          className='navbar-item'
          style={{ gridColumn: 3, borderWidth: '0 1px 0 0' }}
          onMouseDown={() => {
            soundContext.playClick();
            navigate('/collections');
          }}
        >
          <div className='clickable-link'>Realms</div>
        </div>

        <div
          className='navbar-item'
          style={{ gridColumn: 4, borderWidth: '0 1px 0 0' }}
          onMouseDown={() => {
            soundContext.playClick();
            navigate('/card-builder');
          }}
        >
          <div className='clickable-link'>Card Builder</div>
        </div>

        {/* title */}
        <div className='navbar-title'>
          <h3>Legends of Leakos</h3>
        </div>

        {/* right links */}
        <div
          className='navbar-item'
          style={{ gridColumn: 6, borderWidth: '0 1px' }}
          onMouseDown={() => {
            soundContext.playClick();
            navigate('/test');
          }}
        >
          <div className='clickable-link'>Test</div>
        </div>

        <div
          className='navbar-item'
          style={{ gridColumn: 7, borderWidth: '0 1px 0 0' }}
          onMouseDown={() => {
            soundContext.playClick();
            navigate('/test');
          }}
        >
          <div className='clickable-link'>Tidings</div>
        </div>
        <div
          className='navbar-item'
          style={{ gridColumn: 8, borderWidth: '0 1px 0 0' }}
          onMouseDown={() => {
            logout();
          }}
        >
          <div className='clickable-link'>Flee</div>
        </div>
      </div>
    );
  }

  function MobileNavbar({ toggleModal }) {
    return (
      <div className='navbar mobile-navbar'>
        <div
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
        </div>

        {/* title */}
        <div className='navbar-title' style={{ gridColumn: 2 }}>
          <h3>Legends of Leakos</h3>
        </div>
        {/* right icon */}
        <div
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
        </div>
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
        )}{' '}
      </div>
      {width < breakpoint && modalOn ? (
        <div className='mobile-modal'>
          <Link
            className='modal-option'
            to='/'
            onClick={() => setModalOn(false)}
          >
            Test
          </Link>
          <Link
            className='modal-option'
            to='/'
            onClick={() => setModalOn(false)}
          >
            Test2
          </Link>
        </div>
      ) : null}
    </NavbarStyled>
  );
}

export default Navbar;
