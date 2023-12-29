import React from 'react';

// internal
// css
import { TileHexagonStyled } from './styles/TileHexagon.styled.js';

const Hexagon = ({ x, y, size }) => {
  const hexPoints = [
    { x: x + (size * Math.sqrt(3)) / 2, y: y },
    { x: x + size * Math.sqrt(3), y: y + size / 2 },
    { x: x + size * Math.sqrt(3), y: y + (size * 3) / 2 },
    { x: x + (size * Math.sqrt(3)) / 2, y: y + 2 * size },
    { x: x, y: y + (size * 3) / 2 },
    { x: x, y: y + size / 2 },
  ];
  const points = hexPoints.map((p) => `${p.x},${p.y}`).join(' ');
  return <polygon className='hexagon' points={points} />;
};

const TileHexagon = ({ hexagonSize, borderAlwaysOn }) => {
  const border = borderAlwaysOn ? { stroke: 'gold', strokeWidth: 4 } : null;
  return (
    <TileHexagonStyled
      className='tile-hexagon'
      width={hexagonSize * Math.sqrt(3)}
      height={2 * hexagonSize}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        ...border,
      }}
    >
      <Hexagon x={0} y={0} size={hexagonSize} />
    </TileHexagonStyled>
  );
};

export default TileHexagon;
