import React, { useMemo } from 'react';
import SoundContext from './SoundContext.js';
import hoverSfx from '../sounds/light_click.mp3';
import clickSfx from '../sounds/heavy_click.mp3';

const SoundContextProvider = ({ children }) => {
  const hoverSound = useMemo(() => new Audio(hoverSfx));
  const clickSound = useMemo(() => new Audio(clickSfx));

  const playHover = function () {
    hoverSound.play();
  };

  const playClick = function () {
    clickSound.play();
  };

  const test = 1;

  const value = {
    playHover,
    playClick,
    test,
  };

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
};

export default SoundContextProvider;
