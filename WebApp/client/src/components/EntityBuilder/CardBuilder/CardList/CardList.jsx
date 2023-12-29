import React, { useState, useEffect, useContext } from 'react';

// internal
// components
import CardListItem from './CardListItem.jsx';

// css
import { CardListStyled } from './styles/CardList.styled.js';

function CardList({ cards, selectedCard, setSelectedCard, createNewCard }) {
  return (
    <CardListStyled className='card-list'>
      <button onClick={createNewCard}>Create New Card</button>
      <div className='card-holder'>
        {cards.map((card) => {
          return (
            <CardListItem
              key={card.libraryId}
              card={card}
              setCard={setSelectedCard}
              amSelected={
                !!selectedCard && selectedCard.libraryId == card.libraryId
              }
            />
          );
        })}
      </div>
    </CardListStyled>
  );
}

export default CardList;
