import React from 'react';

// internal
// css
import { TileImageStyled } from './styles/TileImage.styled.js';

const TileImage = ({ hexagonSize, url }) => {
  return (
    <TileImageStyled
      src={url}
      style={{
        position: 'absolute',
        left: 0,
        top: (-1 * (3 * hexagonSize)) / 3,
        zIndex: 9,
        width: hexagonSize * Math.sqrt(3),
        height: 3 * hexagonSize,
      }}
    ></TileImageStyled>
  );
};

export default TileImage;
