import React, { useContext } from 'react';
import CardListItem from './CardListItem.jsx';
import PlayerContext from '../../../../contexts/PlayerContext.js';

import { CardListStyled } from './styles/CardList.styled.js';

function CardList({ cards, removeCard, removeAll }) {
  const { gameManager } = useContext(PlayerContext);

  return (
    <CardListStyled>
      {!!cards &&
        cards.map((card, index) => (
          <CardListItem
            key={index + card?.libraryId + card?.amount + ''}
            card={card}
            removeCard={removeCard}
            removeAll={removeAll}
          />
        ))}
    </CardListStyled>
  );
}

export default CardList;
