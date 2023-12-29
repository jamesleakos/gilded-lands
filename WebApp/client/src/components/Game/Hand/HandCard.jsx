// a component that displays a realm representing a players land
// external
import React, { useState, useEffect, useContext } from 'react';

// internal components

// context
import PlayerContext from '../../../contexts/PlayerContext.js';
import DisplayContext from '../../../contexts/DisplayContext.js';

// css
import { HandCardStyled } from './styles/HandCard.styled.js';

const HandCard = ({
  card,
  index,
  draggedPos,
  onMouseDown,
  readyForQueue,
  isDragging = false,
}) => {
  // #region context
  const { masterPlayer } = useContext(PlayerContext);
  const { cardHeight, cardWidth } = useContext(DisplayContext);

  // #endregion

  const [isHovered, setIsHovered] = useState(false);

  const [isPlayable, setIsPlayable] = useState(false);
  useEffect(() => {
    if (!masterPlayer || !masterPlayer.gameState) return;
    if (readyForQueue) {
      setIsPlayable(false);
      return;
    }
    setIsPlayable(card.isPlayable(masterPlayer.gameState));
  }, [masterPlayer, card, readyForQueue]);

  return (
    <HandCardStyled
      className={`hand-card`}
      style={
        isDragging
          ? {
              position: 'absolute',
              left: `${draggedPos.x - cardWidth / 2}px`,
              top: `${draggedPos.y - cardHeight / 2}px`,
            }
          : {}
      }
      cardHeight={cardHeight}
      cardWidth={cardWidth}
    >
      <div
        className={
          'card' +
          (isDragging ? ' dragging' : '') +
          (isPlayable ? ' playable' : '')
        }
      >
        <div
          className='hover-sensor'
          onMouseDown={(e) => {
            if (!isPlayable) {
              console.log('not playable');
              return;
            }
            onMouseDown(e, card);
          }}
          onMouseUp={(e) => {}}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className='left-half'></div>
          <div className='right-half'></div>
          <div className='middle'></div>
        </div>
        <p className='name'>{card.name + ' ' + card.instanceId}</p>
        <div className='main-image'>
          {/* <img src={card.imageSrc} alt={card.name} /> */}
        </div>
        <div className='stats'>
          <p>Attack: {card.attack.effectiveValue}</p>
          <p>Health: {card.health.effectiveValue}</p>
          <p>Priority: {card.priority.effectiveValue}</p>
        </div>
      </div>
      {isHovered && (
        <div className='hover-details'>
          <div className='keywords'>
            {card.runtimeKeywords.map((keyword, index) => (
              <span key={index}>{keyword.name}</span>
            ))}
          </div>
          <div className='abilities'>
            {card.abilities.map((ability, index) => (
              <span key={index}>{ability.name}</span>
            ))}
          </div>
          <div className='enchantments'>
            {card.enchantments.map((ench, index) => (
              <span key={index}>{ench.name}</span>
            ))}
          </div>
        </div>
      )}
    </HandCardStyled>
  );
};

export default HandCard;
