import React, { useState, useEffect } from 'react';
import EditableText from './EditableText.jsx';
import { IntcreaserStyled, ArrowButton } from './styles/Intcreaser.styled.js';

function Intcreaser({ int, onIntChange, minValue, maxValue, _enum = null }) {
  const [currentInt, setCurrentInt] = useState(int);
  const [currentMinValue, setCurrentMinValue] = useState(null);
  const [currentMaxValue, setCurrentMaxValue] = useState(null);

  useEffect(() => {
    setCurrentInt(int);
  }, [int]);

  useEffect(() => {
    if (!!_enum) {
      const numericValues = Object.values(_enum)
        .filter((value) => !isNaN(value))
        .map(Number);
      setCurrentMinValue(Math.min(...numericValues));
      return;
    }
    if (minValue !== null) {
      setCurrentMinValue(minValue);
    }
  }, [minValue, _enum]);

  useEffect(() => {
    if (!!_enum) {
      const numericValues = Object.values(_enum)
        .filter((value) => !isNaN(value))
        .map(Number);
      setCurrentMaxValue(Math.max(...numericValues));
      return;
    }
    if (maxValue !== null) {
      setCurrentMaxValue(maxValue);
    }
  }, [maxValue, _enum]);

  const handleIncrease = () => {
    if (currentMaxValue !== null && currentInt >= currentMaxValue) return;
    setCurrentInt((prevInt) => prevInt + 1);
    onIntChange(currentInt + 1);
  };

  const handleDecrease = () => {
    if (currentMinValue !== null && currentInt <= currentMinValue) return;
    setCurrentInt((prevInt) => prevInt - 1);
    onIntChange(currentInt - 1);
  };

  const handleIntChange = (newInt) => {
    if (isNaN(newInt)) {
      newInt = 0;
    }
    if (currentMinValue !== null && newInt < currentMinValue)
      newInt = currentMinValue;
    if (currentMaxValue !== null && newInt > currentMaxValue)
      newInt = currentMaxValue;
    setCurrentInt(parseInt(newInt));
    onIntChange(parseInt(newInt));
  };

  return (
    <IntcreaserStyled>
      <ArrowButton onClick={handleDecrease}>▼</ArrowButton>
      {!!_enum ? (
        <div className='enum'>
          <div className='enum-text'>{_enum[currentInt]}</div>
        </div>
      ) : (
        <EditableText text={currentInt} onTextChange={handleIntChange} />
      )}
      <ArrowButton onClick={handleIncrease}>▲</ArrowButton>
    </IntcreaserStyled>
  );
}

export default Intcreaser;
