// a component that displays a realm representing a players land
// external
import React, { useState, useEffect, useContext } from 'react';

// internal components

// context
import PlayerContext from '../../../../contexts/PlayerContext.js';

// css
import { KeywordItemStyled } from './styles/KeywordItem.styled.js';

const KeywordItem = ({}) => {
  // #region context
  const { player, masterPlayer } = useContext(PlayerContext);

  // #endregion

  return (
    <KeywordItemStyled
      className={`board-card-keyword-item`}
    ></KeywordItemStyled>
  );
};

export default KeywordItem;
