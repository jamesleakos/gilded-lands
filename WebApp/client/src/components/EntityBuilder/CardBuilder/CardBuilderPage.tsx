// external
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

// lol
import LibraryCard from '../../../../../../LegendsOfLeakos/lib/Classes/Card/LibraryCard.js';

// internal
// hooks
import PlayerContext from '../../../contexts/PlayerContext.js';
import CardLibraryContext from '../../../contexts/CardLibraryContext.js';

// components
import CardBuilder from './CardBuilder.jsx';
import CardList from './CardList/CardList.jsx';

//css
import { CardBuilderPageStyled } from './styles/CardBuilderPage.styled.js';

function CardBuilderPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { gameManager } = useContext(PlayerContext);
  const { cardLibrary, setCardLibrary } = useContext(CardLibraryContext);
  const [selectedCard, setSelectedCard] = useState(null);

  // #region Card Library

  const [filteredCardLibrary, setFilteredCardLibrary] = useState([]);
  useEffect(() => {
    if (!cardLibrary) return;
    setFilteredCardLibrary(cardLibrary);
    if (!selectedCard && cardLibrary.length > 0)
      setSelectedCard(cardLibrary[0]);
  }, [cardLibrary]);

  // #endregion

  // #region Cards API

  const createNewCard = () => {
    axios
      .post('/cards')
      .then((res) => {
        const newCard = LibraryCard.fromJSON(res.data);
        setCardLibrary([...cardLibrary, newCard]);
        setSelectedCard(newCard);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveCard = (card: LibraryCard) => {
    if (!card) {
      console.log('Save Card - No card selected');
      return;
    }
    console.log('CardBuilderPage.saveCard, card (preJSON):', card);
    const json = card.toJSON();
    console.log('CardBuilderPage.saveCard, json:', json);
    axios
      .post(`/cards/${card.libraryId}`, json)
      .then((res) => {
        let tempCards = [];
        const updatedCard = LibraryCard.fromJSON(res.data);
        if (
          !cardLibrary.some(
            (c: LibraryCard) => c.libraryId === updatedCard.libraryId
          )
        ) {
          tempCards = [...cardLibrary, updatedCard];
        } else {
          tempCards = cardLibrary.map((c) =>
            c.libraryId === updatedCard.libraryId ? updatedCard : c
          );
        }
        setCardLibrary(tempCards);
        setSelectedCard(updatedCard);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCard = (card: LibraryCard) => {
    if (!card) {
      console.log('Delete Card - No card id');
      return;
    }

    if (card.libraryId === null || card.libraryId === undefined) {
      console.log(card);
      console.log('Delete Card - No card id');
      return;
    }

    axios
      .delete(`/cards/${card.libraryId}`)
      .then((res) => {
        // take out of cards
        const tempCards = cardLibrary.filter(
          (c) => c.libraryId !== card.libraryId
        );
        setCardLibrary(tempCards);
        setSelectedCard(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // #endregion

  return (
    <CardBuilderPageStyled>
      <div className='content'>
        <CardList
          cards={filteredCardLibrary}
          setSelectedCard={setSelectedCard}
          selectedCard={selectedCard}
          createNewCard={createNewCard}
        />
        <CardBuilder
          card={selectedCard}
          saveCard={saveCard}
          deleteCard={deleteCard}
        />
      </div>
    </CardBuilderPageStyled>
  );
}

export default CardBuilderPage;
