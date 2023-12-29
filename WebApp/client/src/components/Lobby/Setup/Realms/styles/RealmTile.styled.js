import styled from 'styled-components';
import '../../../../../styles/constants.css';

export const RealmTileStyled = styled.div`
  --interior-border-margin: 5px;
  --menu-button-height: 30px;

  display: inline-block;
  position: relative;
  width: 250px;
  height: var(--realm-tile-height);
  background-color: var(--color-background-primary);
  padding: 20px;
  border-radius: 5px;
  margin-right: 10px;
  transition: 0.5s;
  overflow: hidden;

  .title {
    max-height: calc(
      var(--realm-tile-height) - var(--menu-button-height) -
        (2 * var(--interior-border-margin))
    );
    text-align: right;
    font-size: 3rem;
    writing-mode: tb-rl;
    transform: rotate(-180deg);
    font-family: var(--bold-medieval-font);
    font-weight: 900;
  }

  :hover {
    // transform: scale(1.02);
    // -webkit-transform: scale(1.02);
  }

  .interior-border {
    position: absolute;
    top: var(--interior-border-margin);
    left: var(--interior-border-margin);
    right: var(--interior-border-margin);
    bottom: var(--interior-border-margin);
    border: 1px solid var(--border-color-dim);
    border-radius: 5px;
    transition: 0.5s;
  }
  .interior-border.selected {
    border: 2px solid var(--border-color-bright);
  }
  // being done in button:hover
  // .interior-border:hover {
  //   border-color: var(--border-color-bright);
  //   border-width: 2px;
  // }

  .menu-button {
    display: inline-block;
    position: absolute;
    bottom: calc(2 * var(--interior-border-margin));
    right: calc(2 * var(--interior-border-margin));
    left: calc(2 * var(--interior-border-margin));
    height: var(--menu-button-height);
    font-size: 0.8rem;
    padding: 5px;
    color: var(--text-color-secondary);
    border: 1px solid var(--border-color-dim);
    // border-radius: 5px;
    background-color: var(--color-background-navbar);
    text-align: center;
    line-height: var(--menu-button-height);
    font-family: var(--logo-font);
    // animation
    font-size: 1rem;
    transition: 0.5s ease;
  }
  .menu-button:hover {
    border: 1px solid var(--border-color-bright);
    color: var(--text-color-accent);
  }
  .menu-button.selected {
    border: 1px solid var(--border-color-bright);
    color: var(--border-color-bright);
    font-size: 1.2rem;
    background-color: red;
  }

  .background {
    position: absolute;
    top: -30px;
    left: -250px;
    width: 800px;
    height: calc(var(--realm-tile-height) + 200px);
    z-index: -1;
  }

  .realm-map {
    height: 100%;
  }
`;
