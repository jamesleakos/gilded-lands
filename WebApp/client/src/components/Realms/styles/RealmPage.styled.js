import styled from 'styled-components';
import '../../../styles/constants.css';

export const RealmPageStyled = styled.div`
  --back-button-height: 30px;

  position: relative;
  height: 100vh;
  overflow: hidden;
  // background-color: var(--color-background-light);
  // background image
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;

  .main-content {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
  }

  .title-bar {
    width: 100vw;
    position: relative;
    height: var(--title-bar-height);
    // background-color: var(--color-background-primary);
    text-align: center;
    line-height: var(--title-bar-height);
  }

  .realm-title {
    font-size: 1.5rem;
    font-family: var(--bold-medieval-font);
    font-weight: 900;
  }

  .realm-map-wrapper {
    margin: 0 auto;
  }

  .back-button {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 100px;
    height: var(--back-button-height);
    font-size: 0.8rem;
    padding: 5px;
    color: var(--text-color-secondary);
    border: 1px solid var(--border-color-dim);
    // border-radius: 5px;
    // background-color: var(--color-background-navbar);
    text-align: center;
    line-height: var(--back-button-height);
    font-family: var(--logo-font);
    // animation
    font-size: 1rem;
    transition: 0.5s ease;
  }
  .back-button:hover {
    border: 1px solid var(--border-color-bright);
    color: var(--text-color-accent);
  }

  .select-realm-button {
    display: inline-block;
    float: left;
    height: var(--back-button-height);
    font-size: 0.8rem;
    padding: 5px;
    color: var(--text-color-secondary);
    border: 1px solid var(--border-color-dim);
    // border-radius: 5px;
    background-color: var(--color-background-navbar);
    text-align: center;
    line-height: var(--back-button-height);
    font-family: var(--logo-font);
    // animation
    font-size: 1rem;
    transition: 0.5s ease;
    grid-column: 2;
  }
  .select-realm-button:hover {
    border: 1px solid var(--border-color-bright);
    color: var(--text-color-accent);
  }

  // height: calc(100vh - var(--navbar-height) - 2 * var(--margin-outside-main) - var(--title-bar-height) - 100px);

  .biome-list-wrapper {
    grid-column: 1/1;
  }

  .biome-list-wrapper .biometile-holder {
    height: calc(
      100vh - var(--navbar-height) - 2 * var(--margin-outside-main) -
        var(--title-bar-height) - 100px
    );
  }

  .subbiome-list-wrapper {
    margin-top: 20px;
    grid-column: 1/1;
  }

  .subbiome-list-wrapper .biometile-holder {
    height: 100%;
  }
`;
