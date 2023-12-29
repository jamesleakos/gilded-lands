import styled from 'styled-components';

export const HandStyled = styled.div`
  width: 100%;
  height: 100%;

  // center cards
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .card-container {
    position: absolute;
    bottom: 0;
    border: 1px solid blue;
  }

  .drag-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .hand-card.dragging {
    opacity: 0;
  }
`;
