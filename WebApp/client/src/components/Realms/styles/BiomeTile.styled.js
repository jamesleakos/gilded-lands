import styled from 'styled-components';
import '../../../styles/constants.css';

export const BiomeTileStyled = styled.div`
  --tile-height: 40px;
  --interior-border-margin: 5px;
  --menu-button-height: 30px;

  display: block;
  position: relative;
  width: calc(100% - 2 * var(--margin-outside-main));
  max-width: 500px;
  height: var(--tile-height);
  // background-color: var(--color-background-primary);
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  margin-right: 10px;
  transition: 0.5s;
  overflow: hidden;
  z-index: 2;

  // background image
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .title {
    text-align: left;
    font-size: 1rem;
    font-family: var(--bold-medieval-font);
    font-weight: 900;
  }

  :hover {
    transform: scale(1.02);
    -webkit-transform: scale(1.02);
  }

  .interior-border {
    position: absolute;
    top: var(--interior-border-margin);
    left: var(--interior-border-margin);
    right: var(--interior-border-margin);
    bottom: var(--interior-border-margin);
    border: 2px solid var(--border-color-dim);
    border-radius: 5px;
    transition: 0.5s;
  }
  .interior-border:hover {
    border-color: var(--border-color-bright);
    // border-color: gold;
  }
  .interior-border.selected {
    border-color: gold;
  }
`;
