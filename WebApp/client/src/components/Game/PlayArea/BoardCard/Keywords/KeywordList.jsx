// a component that displays a realm representing a players land
// external
import React, { useState, useEffect, useContext } from 'react';

// internal components

// context
import PlayerContext from '../../../../contexts/PlayerContext.js';

// css
import { KeywordListStyled } from './styles/KeywordList.styled.js';

const KeywordList = ({}) => {
  // #region context
  const { player, masterPlayer } = useContext(PlayerContext);

  // #endregion

  return (
    <KeywordListStyled
      className={`board-card-keyword-list`}
    ></KeywordListStyled>
  );
};

export default KeywordList;
