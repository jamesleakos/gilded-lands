// external
import React from 'react';
import lol from '../../../../../lol_access';

// internal
import PlayerContext from '../../../contexts/PlayerContext.js';
// components
//css
import {
  CardStyled,
  CardTitle,
  CardImage,
  CardStats,
  CardStat,
} from './styles/Card.styled.js';

function Card({ card, addCard }) {
  const handleAddCard = () => {
    addCard(card);
  };

  return (
    <CardStyled onClick={handleAddCard}>
      <CardTitle>{card.name}</CardTitle>
      <CardImage
        // src={`https://ik.imagekit.io/hfywj4j0a/LoL/Cards/${card.imageName}.png`}
        src={`https://ik.imagekit.io/hfywj4j0a/LoL/Cards/assassin_red.png`}
        alt={card.name}
      />
      <CardStats>
        <CardStat>{`Attack: ${card.attack}`}</CardStat>
        <CardStat>{`Health: ${card.health}`}</CardStat>
        <CardStat>{`Priority: ${card.priority}`}</CardStat>
      </CardStats>
    </CardStyled>
  );
}

export default Card;
