// external
import React from 'react';
import { Enums } from 'legends-of-leakos';
const LandType = Enums.LandType;

// internal
// components
import RealmMap from '../Tiles/RealmMap.jsx';
//css
import { BiomeTileStyled } from './styles/BiomeTile.styled.js';

const formatImageLink = (link) => {
  return `linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) ), url('${link}')`;
};

function BiomeTile({
  name,
  biome,
  isSelected,
  setSelectedBiome,
  mouseOverBiome,
}) {
  const landType = biome.getLandTiles()[0].landType;
  const url = `https://ik.imagekit.io/hfywj4j0a/LoL/BiomeTileBackgrounds/${LandType[landType]}.png`;

  return (
    <BiomeTileStyled
      style={{
        backgroundImage: formatImageLink(url),
      }}
      onClick={() => {
        if (!isSelected) {
          setSelectedBiome(biome);
        } else {
          setSelectedBiome(null);
        }
      }}
      onMouseEnter={() => {
        mouseOverBiome(biome);
      }}
      onMouseLeave={() => {
        if (!isSelected) {
          mouseOverBiome(null);
        }
      }}
    >
      <div className={`interior-border ${isSelected ? ' selected' : ''}`}></div>
      {/* we used the passed name instead of the biome name to more easily get subbiomes without having to set them properly - maybe we'll change this */}
      <div className='title'>{name}</div>
    </BiomeTileStyled>
  );
}

export default BiomeTile;
