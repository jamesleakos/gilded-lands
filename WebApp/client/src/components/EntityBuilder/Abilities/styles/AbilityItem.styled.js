import styled from 'styled-components';

export const AbilityItemStyled = styled.div`
  padding: 5px;
  margin: 5px;
  border: 1px solid white;
  position: relative;

  .ability-delete-button {
    position: absolute;
    top: 5px;
    right: 5px;
  }

  .effect-item-content {
    padding: 5px;
    margin: 5px;
    border: 1px solid white;
  }

  .effect-value-item {
    padding: 5px;
    margin: 5px;
    border: 1px solid white;
    display: flex;
    align-items: center;
  }

  .effect-value-item-type {
    margin-right: 10px;
  }

  .target-type-item {
    padding: 5px;
    margin: 5px;
    border: 1px solid white;
  }

  .costs {
    padding: 5px;
    margin: 5px;
    border: 1px solid white;
  }
`;
