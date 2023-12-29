import styled from 'styled-components';
import '../../../../styles/constants.css';

export const RealmStyled = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: ${(props) => (props.isVisible ? 'var(--game-realm-z-index)' : '50')};
  pointer-events: ${(props) => (props.isVisible ? 'auto' : 'none')};

  .realm-wrapper {
    height: 100%;
    padding: 10px;
  }

  .realm-map {
    height: 95%;
  }

  .show-realm-button {
    position: absolute;
    z-index: ${(props) => (props.isVisible ? '201' : '51')};
    pointer-events: auto;
  }

  .show-realm-button.opponent {
    top: 0;
    left: 0;
  }

  .show-realm-button.player {
    bottom: 0;
    right: 0;
  }
`;
