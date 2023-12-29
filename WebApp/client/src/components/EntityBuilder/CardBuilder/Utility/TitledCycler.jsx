import React from 'react';
import Cycler from './Cycler.jsx';
import { TitledCyclerStyled } from './styles/TitledCycler.styled.js';

function TitledCycler({ title, items, onItemChange, currentItem }) {
  return (
    <TitledCyclerStyled>
      <div className='cycler-title'>{title}</div>
      <Cycler
        items={items}
        onItemChange={onItemChange}
        currentItem={currentItem}
      />
    </TitledCyclerStyled>
  );
}

export default TitledCycler;
