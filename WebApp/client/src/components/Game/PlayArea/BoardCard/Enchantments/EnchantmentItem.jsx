// a component that displays a realm representing a players land
// external
import React, { useState, useEffect, useContext } from 'react';

// internal components
import AbilityBox from '../Abilities/AbilityBox.jsx';

// lol
import lol from '../../../../../../../lol_access/index.js';

// context
import PlayerContext from '../../../../contexts/PlayerContext.js';
import DisplayContext from '../../../../contexts/DisplayContext.js';

// css
import { EnchantmentItemStyled } from './styles/EnchantmentItem.styled.js';

const EnchantmentItem = ({
  isPlayer,
  enchantment,
  playerInfo,
  amActing = false,
  // ability
  startAbility,
  actingAbilityEntity,
  actingAbility,
  currentTargetCriteria,
  addTarget,
}) => {
  // #region context
  const { masterPlayer } = useContext(PlayerContext);
  const { cardHeight, cardWidth } = useContext(DisplayContext);

  const [hover, setHover] = useState(false);

  const handleMouseUp = (e) => {
    if (!!actingAbility && !!currentTargetCriteria && !!addTarget) {
      addTarget(e, enchantment);
    }
  };

  // #endregion

  return (
    <EnchantmentItemStyled
      className={`enchantment-item`}
      cardHeight={cardHeight}
      cardWidth={cardWidth}
      onMouseUp={(e) => handleMouseUp(e)}
      hover={hover}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className='enchantment-item-content'>
        <p>{enchantment.name}</p>
      </div>
    </EnchantmentItemStyled>
  );
};

export default EnchantmentItem;
