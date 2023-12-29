// a component that displays a player's mana
// external
import React, { useState, useEffect, useContext } from 'react';

// internal components
import QueueListItem from './QueueListItem.jsx';

// context
import PlayerContext from '../../../contexts/PlayerContext.js';

// css
import { QueueListStyled } from './styles/QueueList.styled.js';

const QueueList = () => {
  const { masterPlayer, runQueue } = useContext(PlayerContext);
  const [queuelines, setQueuelines] = useState([]);
  const [amActive, setAmActive] = useState(false);

  useEffect(() => {
    if (!masterPlayer || !masterPlayer.gameState) return;
    const newQueuelines = masterPlayer.queue;
    setQueuelines(newQueuelines);
  }, [masterPlayer]);

  return (
    <QueueListStyled className='queuelist' amActive={amActive}>
      <div className='triangle-button' onClick={() => setAmActive(!amActive)}>
        {amActive ? '▼' : '▶'}
      </div>
      {amActive && (
        <div className='queue-content'>
          <div className='queuelines'>
            {queuelines.map((queueline) => (
              <QueueListItem
                key={queueline.queuePosition}
                queueline={queueline}
              />
            ))}
          </div>
          <div className='play-button' onClick={() => runQueue()}>
            {'▶'}
          </div>
        </div>
      )}
    </QueueListStyled>
  );
};

export default QueueList;
