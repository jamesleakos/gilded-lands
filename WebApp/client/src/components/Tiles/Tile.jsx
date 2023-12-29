// external
import React, { useState, useEffect, useMemo } from 'react';
import { Constants } from 'legends-of-leakos';
const intsToUrl = Constants.imageMapping.landTypes.intsToUrl;

// internal
import TileText from './TileText.jsx';
import TileImage from './TileImage.jsx';
import TileHexagon from './TileHexagon.jsx';
import LandTypeSelectorBar from '../Realms/LandTypeSelectorBar.jsx';
import LandTypeSelector from '../Realms/LandTypeSelector.jsx';

// css
import { TileStyled } from './styles/Tile.styled.js';

function Tile({
  id,
  x,
  y,
  hexagonSize,
  landType,
  depth,
  onClickTile,
  onRightClickTile,
  onMouseEnterTile,
  onMouseLeaveTile,
  outlineOnHover,
  outlined,
  selfSelectorReturn,
}) {
  // #region SELF SELECTOR
  const [selfSelectorOn, setSelfSelectorOn] = useState(false);
  const handleRightClick = (e) => {
    e.preventDefault();
    if (onRightClickTile) {
      onRightClickTile(id);
    }
    if (selfSelectorReturn) setSelfSelectorOn(true);
  };
  const setLandType = (landType) => {
    selfSelectorReturn(id, landType);
    setSelfSelectorOn(false);
  };
  // #endregion

  // # region GETTING URL
  const url = useMemo(() => {
    return intsToUrl(landType, depth);
  }, [landType, Math.min(depth, 3)]);

  // #endregion

  return (
    <TileStyled
      // confusingly, pointer events are disabled for the parent, but enabled for the svg, but that triggers it here
      // we leave it like that though because the shape is correct like that. It works nicely, frankly
      onMouseDown={(e) => {
        if (selfSelectorOn) return;
        if (!onClickTile) return;
        // detect right click and return
        if (e.nativeEvent.button === 2) return;
        onClickTile(id);
      }}
      onContextMenu={handleRightClick}
      onMouseEnter={() => {
        if (!onMouseEnterTile) return;
        onMouseEnterTile(id);
      }}
      onMouseLeave={() => {
        if (!onMouseLeaveTile) return;
        onMouseLeaveTile(id);
      }}
      // style
      style={{
        position: 'absolute',
        left: x,
        top: y,
      }}
    >
      {/* if we need to add any text, this is it */}
      {/* <TileText x={x} y={y} hexagonSize={hexagonSize} text={'test'} /> */}
      <TileImage hexagonSize={hexagonSize} url={url} />
      {/* this takes care of both hover and outlined */}
      {(outlineOnHover || outlined) && (
        <TileHexagon hexagonSize={hexagonSize} borderAlwaysOn={outlined} />
      )}

      {/* self selector */}
      {selfSelectorOn && (
        <SelfSelector
          landTypeSelected={landType}
          setLandTypeSelected={setLandType}
          setSelfSelectorOn={setSelfSelectorOn}
          hexagonSize={hexagonSize}
        />
      )}
    </TileStyled>
  );
}

function SelfSelector({
  landTypeSelected,
  setLandTypeSelected,
  setSelfSelectorOn,
  hexagonSize,
}) {
  return (
    <div
      className='self-selector'
      style={{
        width: hexagonSize * Math.sqrt(3) * 10,
        left: -(hexagonSize * Math.sqrt(3) * 4.5),
      }}
    >
      <div
        className='fader'
        onClick={() => {
          setSelfSelectorOn(false);
        }}
      ></div>
      <div
        className='city-selector'
        style={{
          position: 'absolute',
          top: hexagonSize * -3,
          left: hexagonSize * Math.sqrt(3) * 4.4,
          height: '100%',
          width: hexagonSize * 2,
          zIndex: 999,
        }}
      >
        <LandTypeSelector
          landType={7}
          setLandTypeSelected={setLandTypeSelected}
          selected={landTypeSelected === 7}
        />
      </div>
      <LandTypeSelectorBar
        landTypeSelected={landTypeSelected}
        setLandTypeSelected={setLandTypeSelected}
      />
    </div>
  );
}

export default Tile;
