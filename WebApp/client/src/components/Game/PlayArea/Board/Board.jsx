// external
import React, { useState, useEffect, useContext } from 'react';

// internal components
import BoardCard from '../BoardCard/BoardCard.jsx';

// context
import PlayerContext from '../../../../contexts/PlayerContext.js';

// css
import { BoardStyled } from './styles/Board.styled.js';

// lol
import lol from '../../../../../../lol_access/index.js';
const ZoneEnum = lol.Enums.ZoneEnum;
const NetworkProtocol = lol.Enums.NetworkProtocol;

const Board = ({
  // identity
  isPlayer,
  playerInfo,
  zoneEnum,
  // queue
  queueMessages,
  isQueueReview,
  // play card
  playCard,
  draggedCard,
  // attacking and blocking
  amActing,
  actingCard,
  startCombatTargeting,
  endCombatTargeting,
  // ability
  startAbility,
  actingAbilityEntity,
  actingAbility,
  currentTargetCriteria,
  addTarget,
}) => {
  // #region mouse events
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleMouseUp = () => {
    if (!isPlayer) return;
    if (!playCard) {
      console.log('This shouldnt happen, isPlayer is true but no playCard');
      return;
    }
    if (zoneEnum === ZoneEnum.BattleBoard) return;
    if (!draggedCard) return;

    playCard(draggedCard, zoneEnum);
  };
  // #endregion

  // cards
  const [cards, setCards] = useState([]);
  const [queuedCards, setQueuedCards] = useState([]);

  useEffect(() => {
    if (!playerInfo) {
      return;
    }
    const thisZone = playerInfo.getFriendlyZoneFromZoneEnum(zoneEnum);
    if (!thisZone) {
      console.log('could not get this zone');
      return;
    }
    const cardsInZone = thisZone.cards;
    const cardsPlayedToThisZone = [];
    const cardsMovedToThisZone = [];
    const cardsMovedFromThisZone = [];

    if (!!queueMessages && !isQueueReview) {
      for (let i = 0; i < queueMessages.length; i++) {
        const message = queueMessages[i];

        if (message.messageEnum === NetworkProtocol.QueuePlayCard) {
          if (message.destinationZoneZoneEnum === zoneEnum) {
            const card = playerInfo.getCardFromInstanceId(
              message.cardInstanceId
            );
            if (!card) {
              throw new Error(
                'Could not find card with instanceId ' +
                  message.cardInstanceId +
                  ' in playerInfo: ' +
                  playerInfo
              );
            }
            cardsPlayedToThisZone.push(card);
          }
        }

        if (message.messageEnum === NetworkProtocol.PlayerCardMovedRow) {
          if (message.destinationZoneZoneEnum === zoneEnum) {
            const card = playerInfo.getCardFromInstanceId(
              message.movedCardInstanceId
            );
            if (!card) {
              throw new Error(
                'Could not find card with instanceId ' +
                  message.movedCardInstanceId
              );
            }
            cardsMovedToThisZone.push(card);
          }
          if (message.originZoneZoneEnum === zoneEnum) {
            const card = playerInfo.getCardFromInstanceId(
              message.movedCardInstanceId
            );
            if (!card) {
              throw new Error(
                'Could not find card with instanceId ' +
                  message.movedCardInstanceId
              );
            }
            cardsMovedFromThisZone.push(card);
          }
        }
      }
    }

    const newCards = cardsInZone.filter(
      (card) =>
        !cardsMovedFromThisZone.find(
          (movedCard) => movedCard.instanceId === card.instanceId
        )
    );

    const newQueuedCards = [];
    newQueuedCards.push(...cardsMovedToThisZone);
    newQueuedCards.push(...cardsPlayedToThisZone);

    setCards(newCards);
    setQueuedCards(newQueuedCards);
  }, [playerInfo, queueMessages]);

  // component
  return (
    <BoardStyled
      className={'board' + (isPlayer ? ' player' : ' opponent')}
      // props for styling
      amPlayingCard={!!draggedCard}
      amPlayableBoard={isPlayer && zoneEnum !== ZoneEnum.BattleBoard}
      hovered={hovered}
      amActing={amActing}
      // mouse events
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
    >
      <div className={'board-content'}>
        <div className='boardcard-container'>
          {cards.map((card, index) => {
            return (
              <BoardCard
                key={card.instanceId}
                isPlayer={isPlayer}
                card={card}
                playerInfo={playerInfo}
                index={index}
                onMouseDown={() => {}}
                // combat stuff
                startCombatTargeting={startCombatTargeting}
                amActing={amActing}
                actingCard={actingCard}
                endCombatTargeting={endCombatTargeting}
                // ability stuff
                startAbility={startAbility}
                actingAbilityEntity={actingAbilityEntity}
                actingAbility={actingAbility}
                currentTargetCriteria={currentTargetCriteria}
                addTarget={addTarget}
              />
            );
          })}
          {queuedCards.map((card, index) => {
            return (
              <BoardCard
                key={card.instanceId}
                card={card}
                index={index}
                isQueued={true}
              />
            );
          })}
        </div>
      </div>
    </BoardStyled>
  );
};

export default Board;
