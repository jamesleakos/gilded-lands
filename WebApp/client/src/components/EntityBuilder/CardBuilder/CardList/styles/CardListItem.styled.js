import styled from 'styled-components';
import '../../../../../styles/constants.css';

export const CardListItemStyled = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  color: ${(props) => (props.amSelected ? 'red' : 'white')};

  :hover {
    color: red;
  }
`;
