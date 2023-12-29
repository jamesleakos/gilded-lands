import React, { useContext, useEffect } from 'react';

import { CardListItemStyled } from './styles/CardListItem.styled.js';
import CardLibraryContext from '../../../../contexts/CardLibraryContext.js';

function CardListItem({ card, removeCard, removeAll }) {
  const { cardLibrary } = useContext(CardLibraryContext);

  const handleRemoveCard = () => {
    removeCard(card);
  };

  const handleRemoveAll = () => {
    removeAll(card);
  };

  return (
    <CardListItemStyled onClick={handleRemoveCard}>
      <h2>
        {!!cardLibrary &&
          cardLibrary.find((c) => c.libraryID === card.libraryID)?.name}
      </h2>
      <p>{card.amount}</p>
      <p onClick={handleRemoveAll}>X</p>
    </CardListItemStyled>
  );
}

export default CardListItem;
