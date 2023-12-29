// external
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import lol from '../../../../../lol_access';
const { BiomeType, BiomeDepth, BiomeAddCardEnum } = lol.Enums;
const LibraryBiome = lol.Classes.RealmsAndLand.LibraryBiome;
const LibraryCard = lol.Classes.Card.LibraryCard;

// internal
// components
import Card from './Card.jsx';
import CardLibraryContext from '../../../contexts/CardLibraryContext.js';
//css
import { CardDisplayStyled } from './styles/CardDisplay.styled.js';

function CardDisplay({ biome, addCard }) {
  // get card library from context
  const { cardLibrary } = useContext(CardLibraryContext);

  // filter settings
  const [filterSetting, setFilterSetting] = useState('all'); // ['all', 'landType', 'depth', 'addable']
  const [filteredCardLibrary, setFilteredCardLibrary] = useState([]);

  // filter card library
  useEffect(() => {
    if (!biome) return;

    if (filterSetting === 'all') {
      setFilteredCardLibrary(cardLibrary);
    } else if (filterSetting === 'landType') {
      setFilteredCardLibrary(
        cardLibrary.filter((card) => card.biomeType === biome.biomeType)
      );
    } else if (filterSetting === 'depth') {
      setFilteredCardLibrary(
        cardLibrary.filter(
          (card) =>
            (card.biomeDepth === biome.biomeDepth ||
              BiomeDepth[card.biomeDepth] === 'all') &&
            card.biomeType === biome.biomeType
        )
      );
    } else if (filterSetting === 'addable') {
      // filter
      setFilteredCardLibrary(
        cardLibrary.filter(
          (card) =>
            biome.cardsCanBeAddedToThisBiome(card, 1, gameManager).result ===
            BiomeAddCardEnum.Success
        )
      );
    }
  }, [filterSetting, cardLibrary, biome]);

  return (
    <CardDisplayStyled>
      <div className='top-bar'>
        <button
          className={`filter-label ${filterSetting === 'all' ? 'active' : ''}`}
          onClick={() => setFilterSetting('all')}
        >
          All
        </button>
        <button
          className={`filter-label ${
            filterSetting === 'landType' ? 'active' : ''
          }`}
          onClick={() => setFilterSetting('landType')}
        >
          {BiomeType[biome?.biomeType]}
        </button>
        <button
          className={`filter-label ${
            filterSetting === 'depth' ? 'active' : ''
          }`}
          onClick={() => setFilterSetting('depth')}
        >
          {BiomeDepth[biome?.biomeDepth]}
        </button>
        <button
          className={`filter-label ${
            filterSetting === 'addable' ? 'active' : ''
          }`}
          onClick={() => setFilterSetting('addable')}
        >
          Addable
        </button>
      </div>
      <div className='card-container'>
        {filteredCardLibrary.map((card, index) => {
          return (
            <Card
              key={index + (!!card.name ? card.name : '') + ''}
              card={card}
              biome={biome}
              addCard={addCard}
            />
          );
        })}
      </div>
    </CardDisplayStyled>
  );
}

export default CardDisplay;
