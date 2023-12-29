import React, { useState, useEffect } from 'react';
import { CyclerStyled, ArrowButton } from './styles/Cycler.styled.js';

function Cycler({ items, onItemChange, currentItem }) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  useEffect(() => {
    setCurrentItemIndex(items.indexOf(currentItem));
  }, [items, currentItem]);

  const handleNext = () => {
    const nextIndex = currentItemIndex + 1;
    if (nextIndex >= items.length) {
      setCurrentItemIndex(0);
      onItemChange(items[0]);
      return;
    }
    setCurrentItemIndex(nextIndex);
    onItemChange(items[nextIndex]);
  };

  const handlePrevious = () => {
    const previousIndex = currentItemIndex - 1;
    if (previousIndex < 0) {
      setCurrentItemIndex(items.length - 1);
      onItemChange(items[items.length - 1]);
      return;
    }
    setCurrentItemIndex(previousIndex);
    onItemChange(items[previousIndex]);
  };

  return (
    <CyclerStyled>
      <ArrowButton onClick={handlePrevious}>{'<'}</ArrowButton>
      <div className='cycler-text'>{currentItem}</div>
      <ArrowButton onClick={handleNext}>{'>'}</ArrowButton>
    </CyclerStyled>
  );
}

export default Cycler;
