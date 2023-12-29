import styled from 'styled-components';

export const CardListItemStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid var(--border-color-dim);
  cursor: pointer;
  font-size: 1em; // Add this line to make all text the same size

  &:hover {
    background-color: var(--hover-color);
  }
`;
