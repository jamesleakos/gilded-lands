import React from 'react';
import SoundContextProvider from './SoundContextProvider.jsx';
import AuthContextProvider from './AuthContextProvider.jsx';
import SocketContextProvider from './SocketContextProvider.jsx';
import DisplayContextProvider from './DisplayContextProvider.jsx';
import PlayerContextProvider from './PlayerContextProvider.jsx';
import CardLibraryContextProvider from './CardLibraryContextProvider.jsx';

const MasterContextProvider = ({ children }) => {
  return (
    <SoundContextProvider>
      <DisplayContextProvider>
        <CardLibraryContextProvider>
          <SocketContextProvider>
            {/* Player needs access to socket */}
            <PlayerContextProvider>
              {/* Auth needs access to socket */}
              <AuthContextProvider>{children}</AuthContextProvider>
            </PlayerContextProvider>
          </SocketContextProvider>
        </CardLibraryContextProvider>
      </DisplayContextProvider>
    </SoundContextProvider>
  );
};

export default MasterContextProvider;
