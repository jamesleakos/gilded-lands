import styled from 'styled-components';

export const BoardStyled = styled.div`
  // done in gamepage, its just easier since positioning is there already
  width: 100%;
  height: calc(100% / 6 - ((6 - 1) * 10px / 6));

  .board-content {
    border: 4px solid rgba(255, 255, 255, 0.3); // Semi-transparent border
    box-sizing: border-box; // Include border in element's total width and height
    width: 100%;
    height: 100%;
  }

  .boardcard-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${(props) =>
    props.hovered &&
    !props.amPlayingCard &&
    !props.isAttacking &&
    `
    .board-content {
      border: 4px solid white;
    }
  `}

  ${(props) =>
    props.amPlayingCard &&
    props.amPlayableBoard &&
    props.hovered &&
    !props.isAttacking &&
    `
    .board-content {
      border: 4px solid white;
    }
  `}

  ${(props) =>
    props.amPlayingCard &&
    props.amPlayableBoard &&
    !props.isAttacking &&
    `
    // height: calc(100% / 3 - ((3 - 1) * 10px / 3));
  `}

  ${(props) =>
    props.amPlayingCard &&
    !props.amPlayableBoard &&
    !props.isAttacking &&
    `
    // height: calc(100% / 12 - ((12 - 1) * 10px / 12));
  `}
`;
