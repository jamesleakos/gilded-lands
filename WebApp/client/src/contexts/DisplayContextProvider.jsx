// external
import React, { useState, useEffect, useContext } from 'react';

// internal
import DisplayContext from './DisplayContext.js';

// sizing constants
const CARD_HEIGHT_RATIO = 0.16;
const CARD_WIDTH_RATIO = 0.67 * CARD_HEIGHT_RATIO;

const DisplayContextProvider = ({ children }) => {
  // everything is based off this
  const [displayHeight, setDisplayHeight] = useState(1000);

  // other derivitive sizes
  // cards
  const [cardHeight, setCardHeight] = useState(100);
  const [cardWidth, setCardWidth] = useState(67);

  useEffect(() => {
    setCardHeight(displayHeight * CARD_HEIGHT_RATIO);
    setCardWidth(displayHeight * CARD_WIDTH_RATIO);
  }, [displayHeight]);

  const value = {
    displayHeight,
    setDisplayHeight,
    cardHeight,
    cardWidth,
  };

  return (
    <DisplayContext.Provider value={value}>{children}</DisplayContext.Provider>
  );
};

export default DisplayContextProvider;
