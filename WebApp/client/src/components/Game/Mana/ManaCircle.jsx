// a component that displays a player's mana
// external
import React, { useState, useEffect, useContext } from 'react';

// css
import { ManaCircleStyled } from './styles/ManaCircle.styled.js';

function ManaCircle({ isPlayer, available, queue, setQueue }) {
  const [queuedMana, setQueuedMana] = useState(0);
  useEffect(() => {
    if (!isPlayer || !queue) return;
    const index = queue.findIndex((mana) => mana.statId === available.statId);
    if (index === -1) {
      setQueuedMana(0);
    } else {
      setQueuedMana(queue[index].value);
    }
  }, [queue]);

  const addMana = () => {
    if (!isPlayer || !queue || !available) {
      console.log(
        'not player: ',
        isPlayer,
        'or no queue: ',
        queue,
        'or no available: ',
        available
      );
      return;
    }

    if (available.effectiveValue === 0) {
      return;
    }

    if (available.effectiveValue - queuedMana <= 0) {
      return;
    }

    setQueue((prevQueue) => {
      const newQueue = [...prevQueue];
      const index = newQueue.findIndex(
        (mana) => mana.statId === available.statId
      );
      if (index === -1) {
        newQueue.push({ statId: available.statId, value: 1 });
      } else {
        newQueue[index].value += 1;
      }
      return newQueue;
    });
  };

  const removeMana = () => {
    if (!isPlayer) return;
    setQueue((prevQueue) => {
      const newQueue = [...prevQueue];
      const index = newQueue.findIndex(
        (mana) => mana.statId === available.statId
      );
      if (index === -1) {
        return newQueue;
      } else {
        newQueue[index].value -= 1;
        if (newQueue[index].value === 0) {
          newQueue.splice(index, 1);
        }
      }
      return newQueue;
    });
  };

  return (
    <ManaCircleStyled className='mana-circle' isPlayer={isPlayer}>
      <div className={'content' + (isPlayer ? ' player' : ' opponent')}>
        <div
          style={{ position: 'absolute', top: '-20px' }}
          onClick={removeMana}
        >
          {queuedMana > 0 ? queuedMana : ''}
        </div>
        <div className='mana' onClick={addMana}>
          {!!available && available.effectiveValue - queuedMana}
        </div>
        <div className='mana-name'>{available?.name}</div>
      </div>
    </ManaCircleStyled>
  );
}

export default ManaCircle;
