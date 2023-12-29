import React, { useState, useEffect, useContext } from 'react';

// internal
import EditableText from './Utility/EditableText.jsx';
import StatArea from './Stats/StatArea.jsx';
import KeywordList from '../Keywords/KeywordList.jsx';
import AbilityList from '../Abilities/AbilityList.jsx';

// css

import { CardBuilderStyled } from './styles/CardBuilder.styled.js';

function CardBuilder({ card, saveCard, deleteCard }) {
  const [activeTab, setActiveTab] = useState('stats');

  return (
    <CardBuilderStyled activeTab={activeTab}>
      {!!card && (
        <div className='card-builder-content'>
          <div className='card-name'>
            <EditableText
              text={card.name}
              onTextChange={(text) => {
                card.name = text;
                saveCard(card);
              }}
            />
          </div>
          <div className='delete-card-button'>
            <button
              onClick={() => {
                deleteCard(card);
              }}
            >
              Delete Card
            </button>
          </div>
          <div className='tab-buttons'>
            <div
              className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
              onClick={() => setActiveTab('stats')}
            >
              Stats
            </div>
            <div
              className={`tab-button ${
                activeTab === 'keywords' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('keywords')}
            >
              Keywords
            </div>
            <div
              className={`tab-button ${
                activeTab === 'abilities' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('abilities')}
            >
              Abilities
            </div>
          </div>
          <div className='tab-area'>
            {activeTab === 'stats' && (
              <StatArea card={card} saveCard={saveCard} />
            )}
            {activeTab === 'keywords' && (
              <KeywordList
                keywords={card.keywords}
                save={(keywords) => {
                  const newCard = card.clone();
                  newCard.keywords = keywords;
                  saveCard(newCard);
                }}
              />
            )}
            {activeTab === 'abilities' && (
              <AbilityList
                abilities={card.abilities}
                save={(abilities) => {
                  const newCard = card.clone();
                  newCard.abilities = abilities;
                  saveCard(newCard);
                }}
              />
            )}
          </div>
        </div>
      )}
    </CardBuilderStyled>
  );
}

export default CardBuilder;
