import React from 'react';
import Intcreaser from './Intcreaser.jsx';
import {
  Title,
  TitledIntcreaserStyled,
} from './styles/TitledIntcreaser.styled.js';

function TitledIntcreaser({
  title,
  int,
  onIntChange,
  _enum,
  minValue,
  maxValue,
}) {
  return (
    <TitledIntcreaserStyled>
      <Title>{title}</Title>
      <Intcreaser
        int={int}
        onIntChange={onIntChange}
        minValue={minValue}
        maxValue={maxValue}
        _enum={_enum}
      />
    </TitledIntcreaserStyled>
  );
}

export default TitledIntcreaser;
