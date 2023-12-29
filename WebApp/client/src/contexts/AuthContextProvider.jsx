// external
import React, { useContext, useEffect } from 'react';
import axios from 'axios';

// internal
import AuthContext from './AuthContext.js';
import SocketContext from './SocketContext.js';
import usePersistedState from '../hooks/usePersistedState.js';

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = usePersistedState('isLoggedIn', false);

  const { disconnectSocket } = useContext(SocketContext);

  useEffect(() => {
    axios
      .get('/auth/check-auth')
      .then((res) => {
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setIsLoggedIn(false);
      });
  }, []);

  const logout = () => {
    axios
      .post('/auth/logout')
      .then((res) => {
        setIsLoggedIn(false);
        disconnectSocket();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const value = {
    isLoggedIn,
    setIsLoggedIn,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
