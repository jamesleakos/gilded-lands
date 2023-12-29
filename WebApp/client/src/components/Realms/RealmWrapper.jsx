// external
import React, { useEffect, useState, useRef } from 'react';
import { Enums, Constants } from 'legends-of-leakos';

// internal
// hooks
import useWindowDimensions from '../../hooks/useWindowDimensions.js';
// components
import RealmMap from '../Tiles/RealmMap.jsx';
import LandTypeSelectorBar from './LandTypeSelectorBar.jsx';
//css
import { RealmWrapperStyled } from './styles/RealmWrapper.styled.js';

function RealmWrapper({
  realm,
  displayState,
  setDisplayState,
  outlinedTileIndices,
  setLandTypeSelected,
  landTypeSelected,
  landTileClicked,
  landTileEntered,
  landTileLeft,
  selfSelectorReturn,
}) {
  // #region GETTING TILES FROM REALM
  const [tiles, setTiles] = useState([]);
  useEffect(() => {
    if (!realm) return;
    const tiles = realm.getLandTiles();
    setTiles(realm.getLandTiles());
  }, [realm]);

  // #endregion

  // #region SIZING THE MAP

  const { windowHeight, windowWidth } = useWindowDimensions();
  const [availableHeight, setAvailableHeight] = useState(0);
  const [availableWidth, setAvailableWidth] = useState(0);
  const wrapperRef = useRef(null);
  const [size, setSize] = useState(null);

  useEffect(() => {
    const handleResizeWindow = () => {
      // based on the css
      // when in the center
      if (displayState !== 'edit-biome') {
        setAvailableHeight(windowHeight - 400);
        setAvailableWidth((windowWidth * 3) / 5);
      } else {
        // when in the left
        setAvailableHeight(windowHeight / 3);
        setAvailableWidth(windowWidth / 5);
      }
    };

    window.addEventListener('resize', handleResizeWindow);
    handleResizeWindow();
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, [windowHeight, windowWidth, displayState]);

  useEffect(() => {
    // TODO - rows should come from a constant somewhere
    const rows = [7, 10, 11, 12, 11, 12, 11, 10, 7];
    // hexagon size is 1/2 of the row height
    const sizeImpliedByHeight = ((availableHeight / rows.length) * 2) / 3;
    // hexagon size is 1/sqrt(3) of the hexagon width
    const sizeImpliedByWidth =
      availableWidth / Math.max(...rows) / Math.sqrt(3);

    const hexSize = Math.min(sizeImpliedByHeight, sizeImpliedByWidth);
    setSize({
      height: hexSize * rows.length * 2 * (3 / 4) + 'px',
      width: hexSize * Math.max(...rows) * Math.sqrt(3) + 'px',
    });
  }, [availableHeight, availableWidth]);

  // #endregion

  // #region CLICK HANDLER
  const handleClick = (e) => {
    if (displayState !== 'select-realm' || !realm) return;
    setDisplayState('edit-realm');
  };
  // #endregion

  return (
    <RealmWrapperStyled
      className='realm-wrapper'
      ref={wrapperRef}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      style={
        displayState === 'edit-biome'
          ? { gridColumn: '1/1' }
          : { gridColumn: '2/2' }
      }
    >
      <div
        className={
          displayState === 'select-realm'
            ? 'hoverable realm-map-wrapper'
            : 'realm-map-wrapper'
        }
        style={{ ...size }}
        onClick={handleClick}
      >
        <RealmMap
          tiles={tiles}
          outlinedTileIndices={outlinedTileIndices}
          onClickTile={landTileClicked}
          onRightClickTile={null}
          onMouseEnterTile={landTileEntered}
          onMouseLeaveTile={landTileLeft}
          outlineOnHover={displayState !== 'select-realm'}
          selfSelectorReturn={
            displayState === 'edit-realm' ? selfSelectorReturn : null
          }
          resizeTrigger={displayState}
        />
        {displayState === 'edit-realm' && (
          <LandTypeSelectorBar
            landTypeSelected={landTypeSelected}
            setLandTypeSelected={setLandTypeSelected}
            resizeTrigger={displayState}
          />
        )}
      </div>
    </RealmWrapperStyled>
  );
}

export default RealmWrapper;
