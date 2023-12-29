import React, { useState, useEffect, useContext } from 'react';

// internal

// css
import { CardListItemStyled } from './styles/CardListItem.styled.js';

function CardListItem({ card, setCard, amSelected }) {
  return (
    <CardListItemStyled
      className='card-list-item'
      onClick={() => {
        setCard(card);
      }}
      amSelected={amSelected}
    >
      <div className='card'>
        <div className='card-name'>{card.name}</div>
      </div>
    </CardListItemStyled>
  );
}

export default CardListItem;
