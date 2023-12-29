import styled from 'styled-components';
import '../../../../../styles/constants.css';

export const BoardCardStyled = styled.div`
  position: relative;
  display: inline-block;
  z-index: ${({ hover }) => (hover ? '1000' : 'var(--board-card-z-index)')};
  height: 100%;
  width: ${({ cardWidth }) => `${cardWidth}px`};

  .card {
    position: relative;
    border: ${({ hover }) => (hover ? '1px solid white' : '1px solid black')};
    padding: calc(${({ cardWidth }) => `${cardWidth}px`} / 20);
    width: 100%; // Make the card fill the container
    height: 100%; // Make the card fill the container
    text-align: center;
    box-sizing: border-box;
    background-color: ${({ isQueued }) => (isQueued ? 'grey' : 'black')};
    z-index: 1;
    overflow: hidden;
  }

  .card.has-actions {
    border: 1px solid white;
  }

  .name {
    font-size: calc(${({ cardWidth }) => `${cardWidth}px`} / 7);
  }

  .main-image {
    width: 100%; // Make the image fill the card
    height: 40%; // Adjust as necessary
    margin-bottom: calc(${({ cardWidth }) => `${cardWidth}px`} / 20);
    background-color: white; // Placeholder for the image
    object-fit: cover; // To keep aspect ratio of the image
  }

  .stats p {
    font-size: calc(${({ cardWidth }) => `${cardWidth}px`} / 7);
  }

  .abilities {
    background-color: green;
    position: absolute;
    top: 0;
    left: 100%;
    transform: translateZ(0);
    z-index: 2;
  }

  .abilities.invisible {
    display: none;
  }
`;
