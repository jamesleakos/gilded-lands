// a component that displays a realm representing a players land
// external
import React, { useState, useEffect, useContext } from 'react';

// internal components

// context

// css
import { MidpointStyled, ArrowStyled } from './styles/Arrow.styled.js';

const Arrow = ({ from, to, cancelAction, color }) => {
  const midpoint = {
    x: (from.x + to.x) / 2,
    y: (from.y + to.y) / 2,
  };

  return (
    <ArrowStyled>
      <svg className='svg-arrow'>
        <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={'white'} />
        {/* Add more SVG elements here to create the arrowhead */}
      </svg>
      <MidpointStyled
        color={color}
        midpoint={midpoint}
        onClick={() => {
          if (!!cancelAction) cancelAction();
        }}
      />
    </ArrowStyled>
  );
};

export default Arrow;
