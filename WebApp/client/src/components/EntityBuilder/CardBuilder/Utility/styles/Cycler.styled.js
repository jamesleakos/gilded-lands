import styled from 'styled-components';

export const CyclerStyled = styled.div`
  display: flex;
  align-items: center;

  .cycler-text {
    margin: 0 5px;
    width: 100px;
    text-align: center; // For horizontal centering
    display: flex; // For vertical centering
    align-items: center; // For vertical centering
    justify-content: center; // For vertical centering
  }
`;

export const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
`;
