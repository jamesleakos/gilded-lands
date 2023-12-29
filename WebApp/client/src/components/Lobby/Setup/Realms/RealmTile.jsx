import React, { useState, useEffect } from 'react';
// internal
import { RealmTileStyled } from './styles/RealmTile.styled';
import RealmMap from '../../../Tiles/RealmMap.jsx';

function RealmTile({ realm, selectRealm, selected }) {
  const title = realm.name;
  const [tiles, setTiles] = useState([]);
  useEffect(() => {
    if (!realm) return;
    setTiles(realm.getLandTiles());
  }, []);

  return (
    <RealmTileStyled>
      <div className={`interior-border ${selected ? ' selected' : ''}`}></div>
      <div className='title'>{title}</div>
      <div className='background'>
        <RealmMap className='realm-map' tiles={tiles} />
      </div>
      <div
        className={`menu-button ${selected ? ' selected' : ''}`}
        onClick={() => {
          selectRealm(realm._id);
        }}
      >
        {selected ? 'Selected' : 'Select Realm'}
      </div>
    </RealmTileStyled>
  );
}

export default RealmTile;
