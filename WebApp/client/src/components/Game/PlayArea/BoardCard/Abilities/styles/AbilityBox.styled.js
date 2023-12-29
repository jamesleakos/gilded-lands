import styled from 'styled-components';

export const AbilityBoxStyled = styled.div`
  border: 1px solid black;
  width: ${({ cardWidth }) => `${cardWidth}px`};
  height: calc(${({ cardWidth }) => `${cardWidth}px`} / 3);
  font-size: calc(${({ cardWidth }) => `${cardWidth}px`} / 7);
  text-align: center;
  background-color: black;
  color: white;
  z-index: 2;

  .ability-box-content {
    height: 100%;
    width: 100%;
    border: 1px solid black;
  }

  .ability-box-content.activatable {
    border: 1px solid white;
  }
`;
