import React, { useState, useEffect, useContext } from 'react';

// internal

// css
import { EnchantmentListItemStyled } from './styles/EnchantmentListItem.styled.js';

function EnchantmentListItem({ enchantment, setEnchantment, amSelected }) {
  return (
    <EnchantmentListItemStyled
      className='enchantment-list-item'
      onClick={() => {
        setEnchantment(enchantment);
      }}
      amSelected={amSelected}
    >
      <div className='enchantment'>
        <div className='enchantment-name'>{enchantment.name}</div>
      </div>
    </EnchantmentListItemStyled>
  );
}

export default EnchantmentListItem;
