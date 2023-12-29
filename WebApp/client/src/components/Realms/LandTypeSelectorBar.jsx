// external
import React, { useEffect, useState } from 'react';

// internal
// components
import LandTypeSelector from './LandTypeSelector.jsx';
//css
import { LandTypeSelectorBarStyled } from './styles/LandTypeSelectorBar.styled.js';

function LandTypeSelectorBar({
  landTypeSelected,
  setLandTypeSelected,
  resizeTrigger,
}) {
  const style = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
    columnGap: '3%',
  };
  const style2 = {
    position: 'absolute',
  };
  return (
    <LandTypeSelectorBarStyled
      className='selector-bar'
      style={{
        ...style,
      }}
    >
      <LandTypeSelector
        landType={0}
        setLandTypeSelected={setLandTypeSelected}
        selected={landTypeSelected === 0}
        resizeTrigger={resizeTrigger}
      />
      <LandTypeSelector
        landType={1}
        setLandTypeSelected={setLandTypeSelected}
        selected={landTypeSelected === 1}
        resizeTrigger={resizeTrigger}
      />
      <LandTypeSelector
        landType={2}
        setLandTypeSelected={setLandTypeSelected}
        selected={landTypeSelected === 2}
        resizeTrigger={resizeTrigger}
      />
      <LandTypeSelector
        landType={3}
        setLandTypeSelected={setLandTypeSelected}
        selected={landTypeSelected === 3}
        resizeTrigger={resizeTrigger}
      />
      <LandTypeSelector
        landType={4}
        setLandTypeSelected={setLandTypeSelected}
        selected={landTypeSelected === 4}
        resizeTrigger={resizeTrigger}
      />
      <LandTypeSelector
        landType={5}
        setLandTypeSelected={setLandTypeSelected}
        selected={landTypeSelected === 5}
        resizeTrigger={resizeTrigger}
      />
      <LandTypeSelector
        landType={6}
        setLandTypeSelected={setLandTypeSelected}
        selected={landTypeSelected === 6}
        resizeTrigger={resizeTrigger}
      />
    </LandTypeSelectorBarStyled>
  );
}

export default LandTypeSelectorBar;
