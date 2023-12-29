// EXTERNAL
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// INTERNAL
// css
import '../styles/styles.css';
// context
import MasterContextProvider from '../contexts/MasterContextProvider.jsx';
import SocketContext from '../contexts/SocketContext.js';
// components
// pages
import HomePage from './Home/HomePage.jsx';
import LobbyPage from './Lobby/LobbyPage.jsx';
import GamePage from './Game/GamePage.jsx';
import SignInUpPage from './SignInUp/SignInUpPage.jsx';
import RealmPage from './Realms/RealmPage.jsx';
import EntityBuilderPage from './EntityBuilder/EntityBuilderPage.jsx';
import WaitlistPage from './Waitlist/WaitlistPage.jsx';
// utility components
import AnimatedCursor from '../../helpers/animated_cursor.js';
import Protected from './UtilityComponents/Protected.jsx';

// font awesome import
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
library.add(faBars);

// App
// we're doing the Root thing to allow for useNavigate, which needs to be inside BrowserRouter
function App() {
  return (
    <BrowserRouter>
      <MasterContextProvider>
        <Root />
      </MasterContextProvider>
    </BrowserRouter>
  );
}
function Root() {
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate(); // get the navigate function

  useEffect(() => {
    if (!socket) return;

    // on page load, check if the user is already in a room
    socket.emit('check-for-play');

    socket.on('game-started', (room_id) => {
      navigate('/play'); // navigate to the GamePage
    });

    socket.on('rejoined-game', (room_id) => {
      navigate('/play'); // navigate to the GamePage
    });

    return () => {
      // have to leave everything here, otherwise the socket events will be subscribed to multiple times
      socket.off('game-started');
      socket.off('rejoined-game');
    };
  }, [socket, navigate]); // add navigate to the dependency array

  return (
    <div>
      {/* <AnimatedCursor /> */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/lobby'
          element={
            <Protected>
              <LobbyPage />
            </Protected>
          }
        />
        <Route
          path='/card-builder'
          element={
            <Protected>
              <EntityBuilderPage />
            </Protected>
          }
        />
        <Route
          path='/play'
          element={
            <Protected>
              <GamePage />
            </Protected>
          }
        />
        <Route
          path='/test'
          element={
            <Protected>
              <div>TEST TEST TEST</div>
            </Protected>
          }
        />
        <Route
          path='/collections'
          element={
            <Protected>
              <RealmPage />
            </Protected>
          }
        />
        <Route path='/sign-in-up' element={<SignInUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
