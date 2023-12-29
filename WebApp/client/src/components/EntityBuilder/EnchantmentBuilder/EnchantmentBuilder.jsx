import React, { useState, useEffect, useContext } from 'react';

// internal
import EditableText from '../CardBuilder/Utility/EditableText.jsx';
import KeywordList from '../Keywords/KeywordList.jsx';
import AbilityList from '../Abilities/AbilityList.jsx';

// css

import { EnchantmentBuilderStyled } from './styles/EnchantmentBuilder.styled.js';

function EnchantmentBuilder({
  enchantment,
  saveEnchantment,
  deleteEnchantment,
}) {
  const [activeTab, setActiveTab] = useState('stats');

  return (
    <EnchantmentBuilderStyled activeTab={activeTab}>
      {!!enchantment && (
        <div className='enchantment-builder-content'>
          <div className='enchantment-name'>
            <EditableText
              text={enchantment.name}
              onTextChange={(text) => {
                enchantment.name = text;
                saveEnchantment(enchantment);
              }}
            />
          </div>
          <div className='delete-enchantment-button'>
            <button
              onClick={() => {
                deleteEnchantment(enchantment);
              }}
            >
              Delete Enchantment
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
            {activeTab === 'stats' && <div>stats go here</div>}
            {activeTab === 'keywords' && (
              <KeywordList
                keywords={enchantment.keywords}
                save={(keywords) => {
                  const newEnchantment = enchantment.clone();
                  newEnchantment.keywords = keywords;
                  saveEnchantment(newEnchantment);
                }}
              />
            )}
            {activeTab === 'abilities' && (
              <AbilityList
                abilities={enchantment.abilities}
                save={(abilities) => {
                  const newEnchantment = enchantment.clone();
                  newEnchantment.abilities = abilities;
                  saveEnchantment(newEnchantment);
                }}
              />
            )}
          </div>
        </div>
      )}
    </EnchantmentBuilderStyled>
  );
}

export default EnchantmentBuilder;
