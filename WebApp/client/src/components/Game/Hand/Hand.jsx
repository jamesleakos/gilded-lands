// a component that displays a realm representing a players land
// external
import React, { useState, useEffect, useContext, useRef } from 'react';

// lol
import lol from '../../../../../lol_access/index.js';
const NetworkProtocol = lol.Enums.NetworkProtocol;
const ZoneEnum = lol.Enums.ZoneEnum;

// internal components
import HandCard from './HandCard.jsx';

// context
import PlayerContext from '../../../contexts/PlayerContext.js';
import DisplayContext from '../../../contexts/DisplayContext.js';

// css
import { HandStyled } from './styles/Hand.styled.js';

function Hand({ draggedCard, draggedPos, onMouseDown, readyForQueue }) {
  // #region context
  const { masterPlayer } = useContext(PlayerContext);
  const { cardHeight } = useContext(DisplayContext);
  // #endregion

  // #region cards
  const [cards, setCards] = useState([]);
  const [displayCards, setDisplayCards] = useState([]);
  const [queuedCards, setQueuedCards] = useState([]);

  useEffect(() => {
    if (!masterPlayer || !masterPlayer.gameState) return;
    let newCards = masterPlayer
      .getPlayerInfo()
      .getFriendlyZoneFromZoneEnum(ZoneEnum.Hand).cards;

    const cardsBeingPlayed = [];
    for (let i = 0; i < masterPlayer.queueMessages.length; i++) {
      const message = masterPlayer.queueMessages[i];
      if (message.messageEnum === NetworkProtocol.QueuePlayCard) {
        const card = masterPlayer
          .getPlayerInfo()
          .getCardFromInstanceId(message.cardInstanceId);
        if (!card) {
          throw new Error(
            'Could not find card with instanceId ' + message.cardInstanceId
          );
        }
        cardsBeingPlayed.push(card);
      }
    }

    newCards = newCards.filter(
      (card) =>
        !cardsBeingPlayed.find(
          (cardBeingPlayed) => cardBeingPlayed.instanceId === card.instanceId
        )
    );

    setCards(newCards);
    setDisplayCards(
      newCards.filter((card) => card.instanceId !== draggedCard?.instanceId)
    );
  }, [masterPlayer, draggedCard]);

  // #endregion

  return (
    <HandStyled className='player-hand' cardHeight={cardHeight}>
      <div className='card-container'>
        {!!displayCards &&
          displayCards.map((card, index) => {
            return (
              <HandCard
                key={card.instanceId}
                card={card}
                index={index}
                draggedPos={draggedPos}
                onMouseDown={onMouseDown}
                readyForQueue={readyForQueue}
              />
            );
          })}
      </div>
      {draggedCard && (
        <HandCard
          card={draggedCard}
          isDragging={true}
          draggedPos={draggedPos}
        />
      )}
    </HandStyled>
  );
}

export default Hand;
