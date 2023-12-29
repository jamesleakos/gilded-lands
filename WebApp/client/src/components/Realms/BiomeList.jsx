// external
import React, { useEffect, useState } from 'react';
import { Enums } from 'legends-of-leakos';
const LandType = Enums.LandType;
const BiomeDepth = Enums.BiomeDepth;

// internal
// components
import BiomeTile from './BiomeTile.jsx';
//css
import { BiomeListStyled } from './styles/BiomeList.styled.js';

function BiomeList({
  biomes,
  selectedBiome,
  setSelectedBiome,
  mouseOverBiome,
}) {
  return (
    <BiomeListStyled className='biome-list'>
      <div className='underlined-title'>Biomes</div>
      <div className='biometile-holder'>
        {!!biomes &&
          biomes
            .filter((biome) => {
              return biome.biomeType !== LandType.city;
            })
            .map((biome, index) => {
              // to prevent key conflicts
              const biomeID =
                biome.biomeType +
                index +
                biome.landTiles.map((tile) => tile.id).join('-');
              // set name
              // TODO: fix this on the biome class side
              let name = biome.name;
              if (biome.biomeDepth !== BiomeDepth.all) {
                name = BiomeDepth[biome.biomeDepth];
              }
              return (
                <BiomeTile
                  key={biomeID}
                  name={name}
                  biome={biome}
                  isSelected={biome === selectedBiome}
                  setSelectedBiome={setSelectedBiome}
                  mouseOverBiome={mouseOverBiome}
                />
              );
            })}
      </div>
    </BiomeListStyled>
  );
}

export default BiomeList;
