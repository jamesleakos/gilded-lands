import styled from 'styled-components';
import '../../../../../styles/constants.css';

export const RealmSelectionStyled = styled.div`
  padding: var(--margin-outside-main);
  position: relative;

  // background image
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  z-index: 1;

  * {
    z-index: 3;
  }

  .underlined-title {
    z-index: 3;
  }

  .fader {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-background-light);
    opacity: 0.1;
    z-index: 2;
  }
`;
