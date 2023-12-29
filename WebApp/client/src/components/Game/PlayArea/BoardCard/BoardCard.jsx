// a component that displays a realm representing a players land
// external
import React, { useState, useEffect, useContext } from 'react';

// internal components
import AbilityBox from './Abilities/AbilityBox.jsx';

// lol
import lol from '../../../../../../lol_access/index.js';
const NetworkProtocol = lol.Enums.NetworkProtocol;
const PayResourceCost = lol.Classes.PayResourceCost.PayResourceCost;

// context
import PlayerContext from '../../../../contexts/PlayerContext.js';
import DisplayContext from '../../../../contexts/DisplayContext.js';

// css
import { BoardCardStyled } from './styles/BoardCard.styled.js';

const BoardCard = ({
  isPlayer,
  card,
  playerInfo,
  isQueued = false,
  amActing = false,
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
  // #region context
  const { masterPlayer, cancelPlayCard } = useContext(PlayerContext);
  const { cardHeight, cardWidth } = useContext(DisplayContext);

  const [hover, setHover] = useState(false);

  // #endregion

  const [canTakeAction, setCanTakeAction] = useState(false);
  useEffect(() => {
    if (!masterPlayer || !masterPlayer.gameState) return;
    // if it's queued to be played you can always cancel it
    if (!canTakeAction && isQueued) {
      setCanTakeAction(true);
    }
  }, [masterPlayer, card]);

  const handleMouseDown = (e) => {
    if (isQueued) {
      if (masterPlayer.readyForQueue) {
        console.log('already ready for queue');
        return;
      }
      console.log('canceling queued card');
      cancelPlayCard(card.instanceId);
      return;
    }
    // starting a new combat
    if (!amActing && !!startCombatTargeting) {
      // if player.QueueMessages contains a message of type FightCreaturePlayerQueueline
      // and that message has sourceCardInstanceId equal to card.instanceId, return
      if (
        masterPlayer &&
        masterPlayer.queueMessages &&
        masterPlayer.queueMessages.find(
          (msg) =>
            msg.messageEnum === NetworkProtocol.QueueFightCreature &&
            msg.actingCardInstanceId === card.instanceId
        )
      ) {
        console.log('already attacking with this card');
        return;
      }

      if (
        masterPlayer &&
        masterPlayer.gameState &&
        masterPlayer.gameState.blocks.find(
          (block) => block.blockingCardInstanceId === card.instanceId
        )
      ) {
        console.log('already blocking with this card');
        return;
      }

      startCombatTargeting(e, card);
      return;
    } else if (!!actingAbility && !!currentTargetCriteria && !!addTarget) {
      console.log('add target');
      addTarget(e, card);
    }
  };

  const handleMouseUp = (e) => {
    if (amActing && !!actingCard && !!endCombatTargeting) {
      endCombatTargeting(e, card);
      return;
    }
  };

  return (
    <BoardCardStyled
      className={`board-card`}
      cardHeight={cardHeight}
      cardWidth={cardWidth}
      hover={hover}
      isQueued={isQueued}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <div
        className={'card' + (canTakeAction ? ' has-actions' : '')}
        onMouseDown={handleMouseDown}
      >
        <p className='name'>{card.name + ' ' + card.instanceId}</p>
        {/* <div className='main-image'> */}
        {/* <img src={card.imageSrc} alt={card.name} /> */}
        {/* </div> */}
        <div className='stats'>
          <p>Attack: {card.attack.effectiveValue}</p>
          <p>Health: {card.health.effectiveValue}</p>
          <p>Priority: {card.priority.effectiveValue}</p>
        </div>
      </div>
      <div className='keywords'>
        {card.runtimeKeywords.map((keyword, index) => (
          <span key={index}>{keyword.name}</span>
        ))}
      </div>
      <div
        className={
          'abilities' +
          (hover && !actingAbility && isPlayer ? '' : ' invisible')
        }
      >
        {card.abilities.map((ability, index) => (
          <AbilityBox
            cardWidth={cardWidth}
            key={index}
            ability={ability}
            onClick={(e) => {
              if (amActing) {
                console.log('already acting');
                return;
              }
              if (!!actingAbility) {
                console.log('already acting ability');
                return;
              }
              if (playerInfo.userId !== card.ownerPlayerUserId) {
                console.log('not your card');
                return;
              }
              startAbility(e, card, index);
            }}
          />
        ))}
      </div>
      <div className='enchantments'>
        {card.enchantments.map((ench, index) => (
          <span key={index}>{ench.name}</span>
        ))}
      </div>
    </BoardCardStyled>
  );
};

export default BoardCard;
