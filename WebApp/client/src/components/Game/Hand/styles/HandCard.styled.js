import styled from 'styled-components';
import '../../../../styles/constants.css';

export const HandCardStyled = styled.div`
  position: relative;
  display: inline-block;
  pointer-events: none;
  z-index: 100;

  height: ${({ cardHeight }) => `${cardHeight}px`};
  width: ${({ cardWidth }) => `${cardWidth}px`};

  .card {
    border: 1px solid black;
    padding: calc(${({ cardWidth }) => `${cardWidth}px`} / 20);
    width: 100%; // Make the card fill the container
    height: 100%; // Make the card fill the container
    text-align: center;
    box-sizing: border-box;
    background-color: black;
    z-index: var(--hand-card-z-index));
    pointer-events: auto;
    overflow: hidden;
  }

  .card.dragging {
    pointer-events: none;
    z-index: 110;
  }

  .card.playable {
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

  .hover-sensor {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .hover-sensor .left-half {
    position: absolute;
    top: 0;
    left: 0;
    width: 30%;
    height: 100%;
  }

  .hover-sensor .right-half {
    position: absolute;
    top: 0;
    right: 0;
    width: 30%;
    height: 100%;
  }

  .hover-sensor .middle {
    position: absolute;
    top: 0;
    left: 30%;
    width: 40%;
    height: 100%;
  }

  .hover-details {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .keywords {
    position: absolute;
    left: -100px; /* Adjust as necessary */
  }

  .abilities {
    position: absolute;
    right: -100px; /* Adjust as necessary */
  }

  .enchantments {
    position: absolute;
    top: -30px; /* Adjust as necessary */
    width: 100%;
    text-align: center;
  }
`;
