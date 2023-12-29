import styled from 'styled-components';

export const TileStyled = styled.div`
  pointer-events: none;

  .self-selector {
    pointer-events: auto;
    position: absolute;
    top: 0;
  }

  .selector-bar {
    z-index: 999;
  }

  .self-selector .city-selector .land-type-selector {
    height: 100%;
    width: 100%;
  }

  .self-selector .fader {
    position: absolute;
    top: -100vh;
    left: -100vw;
    width: 200vw;
    height: 200vh;
    background-color: black;
    opacity: .5;
    z-index: 998;
  }


`;
