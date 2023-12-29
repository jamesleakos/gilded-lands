import styled from 'styled-components';
import '../../../styles/constants.css';

export const LandTypeSelectorStyled = styled.div`
  position: relative;
  display: inline-block;
  height: 100%;

  .visual {
    transition: 0.2s ease;
  }

  .selected {
    transform: scale(1.1);
    webkit-transform: scale(1.1);
  }

  .visual:hover {
    transform: scale(1.1);
    webkit-transform: scale(1.1);
  }
`;