import styled from 'styled-components';
import '../../../../../styles/constants.css';

export const CardListStyled = styled.div`
  button {
    margin-top: 10px;
    cursor: pointer;
    width: 100%;
    height: 30px;

    &:hover {
      font-weight: bold;
    }
  }
  .card-holder {
    border: 1px solid yellow;
    padding: 5px;
    margin-top: 10px;
  }
`;
