import React, { useState, useEffect } from 'react';
// internal
import { RealmTileStyled } from './styles/RealmTile.styled.js';
import RealmMap from '../Tiles/RealmMap.jsx';

function RealmTile({ realm, isSelected, onRealmClicked, deleteRealm }) {
  // TODO - relace with a Realm class function
  const [tiles, setTiles] = useState([]);
  useEffect(() => {
    if (!realm) return;
    setTiles(realm.getLandTiles());
  }, [realm]);

  return (
    <RealmTileStyled
      onClick={() => {
        onRealmClicked(realm);
      }}
    >
      <div className={`interior-border ${isSelected ? ' selected' : ''}`}></div>
      <div className='title'>{realm.name}</div>
      <div className='background'>
        <RealmMap tiles={tiles} />
      </div>
      <div
        className='delete-button'
        onClick={() => {
          deleteRealm(realm._id);
        }}
      >
        X
      </div>
    </RealmTileStyled>
  );
}

export default RealmTile;
