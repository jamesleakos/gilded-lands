import React from 'react';

// internal
// css
import { TileTextStyled } from './styles/TileText.styled.js';

const TileText = ({ x, y, hexagonSize, text }) => {
  return (
    <TileTextStyled
      style={{
        position: 'absolute',
        left: x + hexagonSize / 2,
        top: y + hexagonSize / 2,
        color: 'red',
        zIndex: 10,
        fontSize: '1rem',
      }}
    >
      {text}
    </TileTextStyled>
  );
};

export default TileText;
