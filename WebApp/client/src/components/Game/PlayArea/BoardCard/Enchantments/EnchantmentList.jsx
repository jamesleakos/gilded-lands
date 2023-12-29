// a component that displays a realm representing a players land
// external
import React, { useState, useEffect, useContext } from 'react';

// internal components

// context
import PlayerContext from '../../../../contexts/PlayerContext.js';

// css
import { EnchantmentListStyled } from './styles/EnchantmentList.styled.js';

const EnchantmentList = ({}) => {
  // #region context
  const { player, masterPlayer } = useContext(PlayerContext);

  // #endregion

  return (
    <EnchantmentListStyled
      className={`board-card-enchantment-list`}
    ></EnchantmentListStyled>
  );
};

export default EnchantmentList;
