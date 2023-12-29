import React, { useState, useEffect, useContext } from 'react';

// internal
import TitledIntcreaser from '../Utility/TitledIntcreaser.jsx';
import Costs from './Costs.jsx';
// css
import { StatAreaStyled } from './styles/StatArea.styled.js';

// lol
import lol from '../../../../../../lol_access/index.js';
const { Classes, Enums } = lol;
const BiomeType = Enums.BiomeType;
const BiomeDepth = Enums.BiomeDepth;

function StatArea({ card, saveCard }) {
  //
  const saveCosts = (newCosts) => {
    card.costs = newCosts;
    saveCard(card);
  };

  return (
    <StatAreaStyled>
      <div className='stat-area-content'>
        <div className='stats'>
          <div className='stat-area-header'>
            <div className='stat-area-header-text'>Stats</div>
          </div>
          <div className='stat-area-body'>
            <TitledIntcreaser
              title='Attack'
              int={card.attack}
              onIntChange={(newAttack) => {
                card.attack = newAttack;
                saveCard(card);
              }}
              minValue={0}
              maxValue={100}
            />
            <TitledIntcreaser
              title='Health'
              int={card.health}
              onIntChange={(newHealth) => {
                card.health = newHealth;
                saveCard(card);
              }}
              minValue={0}
              maxValue={100}
            />
            <TitledIntcreaser
              title='Priority'
              int={card.priority}
              onIntChange={(newCost) => {
                card.cost = newCost;
                saveCard(card);
              }}
              minValue={0}
              maxValue={100}
            />
          </div>
        </div>
        <div className='costs-area'>
          <div className='stat-area-header'>
            <div className='stat-area-header-text'>Costs</div>
          </div>
          <Costs costs={card.costs} saveCosts={saveCosts} />
        </div>

        <div className='land'>
          <div className='stat-area-header'>
            <div className='stat-area-header-text'>Land</div>
          </div>
          <div className='stat-area-body'>
            <TitledIntcreaser
              title='Land Type'
              int={card.biomeType}
              onIntChange={(newBiomeType) => {
                card.biomeType = newBiomeType;
                saveCard(card);
              }}
              _enum={BiomeType}
            />
            <TitledIntcreaser
              title='Land Depth'
              int={card.biomeDepth}
              onIntChange={(newBiomeDepth) => {
                card.biomeDepth = newBiomeDepth;
                saveCard(card);
              }}
              _enum={BiomeDepth}
            />
          </div>
        </div>
      </div>
    </StatAreaStyled>
  );
}

export default StatArea;
