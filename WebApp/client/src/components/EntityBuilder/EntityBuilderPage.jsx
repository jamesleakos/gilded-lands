import React, { useEffect, useState, useContext } from 'react';

// internal
import Navbar from '../Home/Navbar.jsx';
import CardBuilderPage from './CardBuilder/CardBuilderPage.tsx';
import EnchantmentBuilderPage from './EnchantmentBuilder/EnchantmentBuilderPage.jsx';

import { EntityBuilderPageStyled } from './styles/EntityBuilderPage.styled.js';

function EntityBuilderPage() {
  const [activeTab, setActiveTab] = useState('cards');

  return (
    <EntityBuilderPageStyled>
      <Navbar />
      <div className='entity-builder-page'>
        <div className='tab-buttons'>
          <div
            className={`tab-button ${activeTab === 'cards' ? 'active' : ''}`}
            onClick={() => setActiveTab('cards')}
          >
            Cards
          </div>
          <div
            className={`tab-button ${
              activeTab === 'enchantments' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('enchantments')}
          >
            Enchantments
          </div>
        </div>
        <div className='tab-area'>
          {activeTab === 'cards' && <CardBuilderPage />}
          {activeTab === 'enchantments' && <EnchantmentBuilderPage />}
        </div>
      </div>
    </EntityBuilderPageStyled>
  );
}

export default EntityBuilderPage;
