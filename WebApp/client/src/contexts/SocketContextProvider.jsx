// external
import React, { useEffect } from 'react';
import io from 'socket.io-client';

// internal
import SocketContext from './SocketContext.js';
import CONNECTION_URL from '../network_constants.js';

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = React.useState(null);

  useEffect(() => {
    if (socket) return;

    const s = io(CONNECTION_URL, { transport: ['websocket'] });
    setSocket(s);
  }, []);

  const disconnectSocket = () => {
    if (socket) {
      console.log('disconnecting socket...');
      socket.disconnect();
      setSocket(null);
    }
  };

  const value = {
    socket,
    disconnectSocket,
  };
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;
