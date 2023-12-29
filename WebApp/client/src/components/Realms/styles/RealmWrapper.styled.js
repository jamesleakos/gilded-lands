import styled from 'styled-components';
import '../../../styles/constants.css';

export const RealmWrapperStyled = styled.div`
  // grid-column: dealt with inline, as is dependant on display state
  // height: set based on available height inline
  width: 100%;
  display: inline-block;
  
  .realm-map-wrapper {
    border: 3px solid gold;
    border-radius: 25px;
    padding: 40px;
    background-color: black;
    // transition: 0.5s ease;
  }
  .hoverable.realm-map-wrapper:hover {
    // border: 3px solid white;

    .realm-map {
      transform: scale(1.02);
      -webkit-transform: scale(1.02);
    }
  }

  .realm-map {
    height: 100%;
    transition: 0.5s ease;
  }

`;