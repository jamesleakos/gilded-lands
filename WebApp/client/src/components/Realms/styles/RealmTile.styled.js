import styled from 'styled-components';
import '../../../styles/constants.css';

export const RealmTileStyled = styled.div`
  --tile-height: 100px;
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


  .background {
    position: absolute;
    top: -100px;
    left: -100px;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  .realm-map {
    height: 250%;
    width: 250%;
  }

  .delete-button {
    position: absolute;
    top: 8px;
    right: 10px;
    transition: 0.5s ease;
  }
  .delete-button:hover {
    color: var(--text-color-accent);
    transform: scale(1.05);
    -webkit-transform: scale(1.05);
  }
`;
