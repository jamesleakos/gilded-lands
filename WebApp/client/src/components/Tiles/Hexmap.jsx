// external
import React, { useState, useEffect, useRef } from 'react';

// internal
// components
import Tile from './Tile.jsx';
// hooks
import usePersistedState from '../../hooks/usePersistedState.js';
// css
import { HexmapStyled } from './styles/Hexmap.styled.js';

function Hexmap({
  tiles,
  onClickTile,
  onRightClickTile,
  onMouseEnterTile,
  onMouseLeaveTile,
  outlineOnHover,
  outlinedTileIndices,
  selfSelectorReturn,
  resizeTrigger,
}) {
  // TODO - rows should come from a constant somewhere
  const rows = [7, 10, 11, 12, 11, 12, 11, 10, 7];
  const [availableHeight, setAvailableHeight] = useState(0);
  const [availableWidth, setAvailableWidth] = useState(0);
  const hexmapRef = useRef(null);
  const [hexagonSize, setHexagonSize] = useState(0);

  //#region setting hexagonSize
  // setting availableHeight and availableWidth
  const handleResizeWindow = () => {
    const hexmap = hexmapRef.current;
    setAvailableHeight(hexmap.clientHeight);
    setAvailableWidth(hexmap.clientWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow);
    handleResizeWindow();
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  const resizePolling = (str, timeout, polltime) => {
    const hexmap = hexmapRef.current;
    const str2 = hexmap.clientHeight + ' - ' + hexmap.clientWidth;
    if (str !== str2) {
      handleResizeWindow();
    } else {
      timeout = timeout - polltime;
      if (timeout <= 0) return;
      setTimeout(() => {
        resizePolling(str, timeout, polltime);
      }, polltime);
    }
  };

  useEffect(() => {
    if (!resizeTrigger) return;
    const hexmap = hexmapRef.current;
    resizePolling(hexmap.clientHeight + ' - ' + hexmap.clientWidth, 1000, 100);
  }, [resizeTrigger]);

  // setting hexagonSize based on changing availableHeight and availableWidth
  useEffect(() => {
    // hexagon size is 1/2 of the row height
    const sizeImpliedByHeight = ((availableHeight / rows.length) * 2) / 3;
    // hexagon size is 1/sqrt(3) of the hexagon width
    const sizeImpliedByWidth =
      availableWidth / Math.max(...rows) / Math.sqrt(3);

    setHexagonSize(Math.min(sizeImpliedByHeight, sizeImpliedByWidth));
  }, [availableHeight, availableWidth]);
  //#endregion

  return (
    <HexmapStyled className='hex-map' ref={hexmapRef}>
      <div className='hex-area'>
        {rows.map((rowLength, rowIndex) => {
          const rowIndices = rows.slice(0, rowIndex).reduce((a, b) => a + b, 0);
          const yOffset = rowIndex * hexagonSize * 1.5;
          const xOffset =
            ((Math.max(...rows) - rowLength) * hexagonSize * Math.sqrt(3)) / 2;

          return Array.from({ length: rowLength }).map((_, colIndex) => {
            const index = rowIndices + colIndex;
            const x = xOffset + colIndex * Math.sqrt(3) * hexagonSize;
            const y = yOffset;

            return (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                id={index}
                x={x}
                y={y}
                hexagonSize={hexagonSize}
                landType={tiles[index].landType}
                depth={tiles[index].depth}
                onClickTile={onClickTile}
                onRightClickTile={onRightClickTile}
                onMouseEnterTile={onMouseEnterTile}
                onMouseLeaveTile={onMouseLeaveTile}
                outlineOnHover={outlineOnHover}
                outlined={outlinedTileIndices?.includes(index)}
                selfSelectorReturn={selfSelectorReturn}
              />
            );
          });
        })}
      </div>
    </HexmapStyled>
  );
}

export default Hexmap;
