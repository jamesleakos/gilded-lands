// a component that displays a player's mana
// external
import React, { useState, useEffect, useContext } from 'react';

// internal components
import ManaCircle from './ManaCircle.jsx';

// css
import { ManaBarStyled } from './styles/ManaBar.styled.js';

function ManaBar({ isPlayer, playerInfo, queue, setQueue }) {
  return (
    <ManaBarStyled className='mana-bar' isPlayer={isPlayer}>
      <div className='mana-container'>
        <ManaCircle
          className='forest-mana'
          isPlayer={isPlayer}
          available={playerInfo?.nameToStat.get('ForestMana')}
          queue={queue}
          setQueue={setQueue}
        />
        <ManaCircle
          className='ocean-mana'
          isPlayer={isPlayer}
          available={playerInfo?.nameToStat.get('OceanMana')}
          queue={queue}
          setQueue={setQueue}
        />
        <ManaCircle
          className='desert-mana'
          isPlayer={isPlayer}
          available={playerInfo?.nameToStat.get('DesertMana')}
          queue={queue}
          setQueue={setQueue}
        />
        <ManaCircle
          className='mountain-mana'
          isPlayer={isPlayer}
          available={playerInfo?.nameToStat.get('MountainMana')}
          queue={queue}
          setQueue={setQueue}
        />
        <ManaCircle
          className='prairie-mana'
          isPlayer={isPlayer}
          available={playerInfo?.nameToStat.get('PrairieMana')}
          queue={queue}
          setQueue={setQueue}
        />
        <ManaCircle
          className='fells-mana'
          isPlayer={isPlayer}
          available={playerInfo?.nameToStat.get('FellsMana')}
          queue={queue}
          setQueue={setQueue}
        />
        <ManaCircle
          className='tundra-mana'
          isPlayer={isPlayer}
          available={playerInfo?.nameToStat.get('TundraMana')}
          queue={queue}
          setQueue={setQueue}
        />
      </div>
    </ManaBarStyled>
  );
}

export default ManaBar;
