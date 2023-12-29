import styled from 'styled-components';

export const IntcreaserStyled = styled.div`
  display: flex;
  align-items: center;

  .editable-text {
    width: 30px;
  }

  .editable-text-text {
    margin: 0 5px;
    width: 30px;
    text-align: center; // For horizontal centering
    display: flex; // For vertical centering
    align-items: center; // For vertical centering
    justify-content: center; // For vertical centering
  }

  .enum-text {
    width: 200px;
    text-align: center;
  }
`;

export const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
`;
