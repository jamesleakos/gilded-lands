// a component that displays a realm representing a players land
// external
import React, { useState, useEffect, useContext } from 'react';

import lol from '../../../../../../../lol_access/index.js';
const PayResourceCost = lol.Classes.PayResourceCost.PayResourceCost;

// internal components

// context
import PlayerContext from '../../../../../contexts/PlayerContext.js';

// css
import { AbilityBoxStyled } from './styles/AbilityBox.styled.js';

const AbilityBox = ({ ability, onClick, cardWidth }) => {
  const { masterPlayer } = useContext(PlayerContext);
  // player info
  const [playerInfo, setPlayerInfo] = useState(null);
  useEffect(() => {
    if (!masterPlayer || !masterPlayer.gameState) return;
    setPlayerInfo(masterPlayer.getPlayerInfo());
  }, [masterPlayer]);

  const [myAbility, setMyAbility] = useState(null);
  useEffect(() => {
    setMyAbility(ability);
  }, [ability]);

  const [isActivatable, setIsActivatable] = useState(false);
  useEffect(() => {
    if (!masterPlayer || !masterPlayer.gameState) return;
    if (!playerInfo) return;
    setIsActivatable(ability.isActivatable(playerInfo, masterPlayer.gameState));
  }, [myAbility, masterPlayer, playerInfo]);

  const handleClick = (event) => {
    if (!masterPlayer || !masterPlayer.gameState) return;
    if (!playerInfo) return;
    if (!ability.isActivatable(playerInfo, masterPlayer.gameState)) return;
    const newAbility = myAbility.clone();
    newAbility.usesRemaining--;
    setMyAbility(newAbility);
    onClick(event);
  };

  return (
    <AbilityBoxStyled
      className='ability-box'
      onClick={(event) => handleClick(event)}
      cardWidth={cardWidth}
    >
      <div
        className={
          'ability-box-content' + (isActivatable ? ' activatable' : '')
        }
      >
        <p>{ability.name}</p>
        <p>
          {ability.costs
            .map((cost) => {
              const costObj = new PayResourceCost(cost.statId, cost.value);
              const costName = costObj.costName();
              return costName + ': ' + costObj.value;
            })
            .join('; ')}
        </p>
      </div>
    </AbilityBoxStyled>
  );
};

export default AbilityBox;
