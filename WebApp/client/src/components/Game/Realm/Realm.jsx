// a component that displays a realm representing a players land
// external
import React, { useState, useEffect, useContext } from 'react';

// internal components
import RealmMap from '../../Tiles/RealmMap.jsx';

// context
import PlayerContext from '../../../contexts/PlayerContext.js';

// css
import { RealmStyled } from './styles/Realm.styled.js';

function Realm({
  isPlayerRealm,
  isVisible,
  setIsVisible,
  isButtonVisible,
  setPhaseButtonMessage,
}) {
  // #region player context
  // we will use this to fuel all the data we need
  const { masterPlayer } = useContext(PlayerContext);
  // #endregion

  // #region realm and tiles

  const [realm, setRealm] = useState(null);
  const [tiles, setTiles] = useState(null);

  useEffect(() => {
    if (!masterPlayer || !masterPlayer.gameState) return;
    if (isPlayerRealm) {
      setRealm(masterPlayer.getPlayerInfo()?.realm);
    } else {
      setRealm(masterPlayer.getOpponentInfo()?.realm);
    }
  }, [masterPlayer]);

  useEffect(() => {
    if (!realm) {
      return;
    }
    setTiles(realm.landTiles);
  }, [realm]);

  // #endregion

  // #region outlined tiles

  const [outlinedTileIndices, setOutlinedTileIndices] = useState([]);

  useEffect(() => {
    if (!tiles) return;
    // indices
    const exploredTiles = tiles.filter((tile) => tile.explored);
    const exploredTileIndices = exploredTiles.map((tile) => tile.id);
    setOutlinedTileIndices(exploredTileIndices);
  }, [tiles]);

  // #endregion

  // #region server calls

  const exploreTile = (landTileId) => {
    try {
      // check if it's your realm
      if (!isPlayerRealm) {
        console.log('Not your realm');
        return;
      }

      // get the land tile
      const landTile = masterPlayer
        .getPlayerInfo()
        .realm.getLandTile(landTileId);
      if (!landTile) {
        throw new Error('No tile provided');
      }
      if (landTile.explored) {
        console.log('Tile already explored');
        return;
      }
      if (!masterPlayer) {
        throw new Error('No player');
      }
      setPhaseButtonMessage('Waiting on opponent...');
      masterPlayer.exploreLand(landTile);
    } catch (err) {
      console.log(err);
    }
  };

  // #endregion

  return (
    <RealmStyled className='game-realm' isVisible={isVisible}>
      {isButtonVisible && (
        <button
          className={
            'show-realm-button' + (isPlayerRealm ? ' player' : ' opponent')
          }
          onClick={() => {
            console.log('clicked show realm button');
            setIsVisible((prevIsVisible) => {
              return !prevIsVisible;
            });
          }}
        >
          {(isVisible ? 'Hide' : 'Show') +
            (isPlayerRealm ? ' Your' : ' Opponent') +
            ' Realm'}
        </button>
      )}
      {isVisible && (
        <div className='realm-wrapper'>
          <RealmMap
            tiles={tiles}
            outlineOnHover={true}
            outlinedTileIndices={outlinedTileIndices}
            onClickTile={exploreTile}
          />
        </div>
      )}
    </RealmStyled>
  );
}

export default Realm;
