import styled from 'styled-components';

export const TileHexagonStyled = styled.svg`
  // this turns pointer events on for the svg - but triggers them for the onclick on the parent
  pointer-events: auto;
  postion: absolute;
  fill: none;
  z-index: 10;

  :hover {
    stroke: gold;
    stroke-width: 4;
  }
`;
