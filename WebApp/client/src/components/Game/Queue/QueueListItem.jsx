// a component that displays a player's mana
// external
import React, { useState, useEffect, useContext } from 'react';

// context
import PlayerContext from '../../../contexts/PlayerContext.js';

// css
import { QueueListItemStyled } from './styles/QueueListItem.styled.js';

const QueueListItem = ({ queueline }) => {
  const { masterPlayer, loadSavedPlayer } = useContext(PlayerContext);

  return (
    <QueueListItemStyled
      onClick={() => {
        loadSavedPlayer(queueline.queuePosition);
      }}
    >
      {queueline.actionToString(masterPlayer.gameState)}
    </QueueListItemStyled>
  );
};

export default QueueListItem;
