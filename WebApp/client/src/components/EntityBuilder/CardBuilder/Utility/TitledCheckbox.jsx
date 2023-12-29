import React, { useState, useEffect } from 'react';

import Checkbox from './Checkbox.jsx';

import { TitledCheckboxStyled } from './styles/TitledCheckbox.styled.js';

function TitledCheckbox({ title, checked, onCheckedChange }) {
  return (
    <TitledCheckboxStyled className='titled-checkbox'>
      <div className='titled-checkbox-title'>{title}</div>
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
    </TitledCheckboxStyled>
  );
}

export default TitledCheckbox;
