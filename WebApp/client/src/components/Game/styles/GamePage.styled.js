import styled from 'styled-components';

export const GamePageStyled = styled.div`
  border: 1px solid yellow;
  box-sizing: border-box;
  margin: 0;
  overflow: hidden;
  padding: 10px;
  height: 100vh;
  width: 100vw;
  background-color: green;

  display: flex;
  justify-content: center;
  align-items: center;

  .game-container {
    position: relative;
    border: 1px solid red;
    height: 90%;
    width: 100%;

    @media (min-aspect-ratio: 4/3) {
      width: calc(100vh * 4 / 3);
    }

    @media (max-aspect-ratio: 4/3) {
      height: calc(100vw * 3 / 4);
    }
  }

  .board-container {
    position: absolute;
    height: 70%;
    width: 90%;
    top: 10%;
    left: 5%;
    border: 1px solid red;

    // spacing of boards
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .phase-button {
    position: absolute;
    right: 0;
    bottom: 50px;
  }

  .phase-button.inactive {
    background-color: grey;
    cursor: not-allowed;
    pointer-events: none;
  }

  .target-info-container {
    position: absolute;
    height: 10%;
    width: 90%;
    bottom: 5%;
    left: 5%;
    background-color: grey;
    z-index: 500;
  }

  .ship-target-info-button {
    position: absolute;
    top: 0;
    right: 0;
  }

  .cancel-ability-button {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;
