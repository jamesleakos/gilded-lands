import React, { useState, useEffect, useContext } from 'react';

// internal
// components
import EnchantmentListItem from './EnchantmentListItem.jsx';

// css
import { EnchantmentListStyled } from './styles/EnchantmentList.styled.js';

console.log('EnchantmentListStyled', EnchantmentListStyled);

function EnchantmentList({
  enchantments,
  selectedEnchantment,
  setSelectedEnchantment,
  createNewEnchantment,
}) {
  return (
    <EnchantmentListStyled className='enchantment-list'>
      <button onClick={createNewEnchantment}>Create New Enchantment</button>
      <div className='enchantment-holder'>
        {enchantments.map((enchantment) => {
          return (
            <EnchantmentListItem
              key={enchantment.libraryId}
              enchantment={enchantment}
              setEnchantment={setSelectedEnchantment}
              amSelected={
                !!selectedEnchantment &&
                selectedEnchantment.libraryId == enchantment.libraryId
              }
            />
          );
        })}
      </div>
    </EnchantmentListStyled>
  );
}

export default EnchantmentList;
