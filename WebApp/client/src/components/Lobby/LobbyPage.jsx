// external
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import lol from '../../../../lol_access/index.js';
const Classes = lol.Classes;
console.log('Classes', Classes);
const LibraryRealm = Classes.RealmsAndLand.LibraryRealm; // internal

// internal
// css
import { LobbyPageStyled } from './styles/LobbyPage.styled.js';
// components
import Navbar from '../Home/Navbar.jsx';
import RealmSelection from './Setup/Realms/RealmSelection.jsx';
import RoomSelection from './Setup/Rooms/RoomSelection.jsx';
// context
import SocketContext from '../../contexts/SocketContext.js';
import SoundContext from '../../contexts/SoundContext.js';

function LobbyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // vars
  const { socket } = useContext(SocketContext);
  const soundContext = React.useContext(SoundContext);

  //#region REALM SELECTION
  const [realms, setRealms] = useState([]);
  const [selectedRealmID, setSelectedRealmID] = useState(null);
  useEffect(() => {
    console.log('getting realms');
    axios
      .get('/realms')
      .then((res) => {
        setRealms(createRealmsFromJSON(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const selectRealm = (realm_id) => {
    soundContext.playClick();
    setSelectedRealmID(realm_id);
    axios
      .patch('/realms/selected-realm', { realm_id })
      .then((res) => {
        setSelectedRealmID(realm_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createRealmFromJSON = (json) => {
    const realm = LibraryRealm.fromJSON(json);
    // adding this for React keys
    realm._id = json._id || null;
    return realm;
  };

  const createRealmsFromJSON = (json) => {
    const realms = [];
    json.forEach((realm) => {
      realms.push(createRealmFromJSON(realm));
    });
    return realms;
  };
  //#endregion

  return (
    <LobbyPageStyled>
      <Navbar />
      <RealmSelection
        realms={realms}
        selectRealm={selectRealm}
        selectedRealmID={selectedRealmID}
      />
      <RoomSelection socket={socket} />
    </LobbyPageStyled>
  );
}

export default LobbyPage;
