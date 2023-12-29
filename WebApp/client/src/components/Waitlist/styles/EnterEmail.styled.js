import styled from 'styled-components';
import '../../../styles/constants.css';

export const EnterEmailStyled = styled.div`
  
  padding: var(--margin-outside-main);
  position: relative;

  // background image
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  z-index: 1;
  height: calc(100vh - var(--navbar-height) - 2 * var(--margin-outside-main) - 2px);

  .container {
    display: flex;
    justify-content: center;
    margin-top: 100px;
  }

  .center-content {
    width: 400px;
    border: 1px solid white;
    border-radius: 5px;
    padding: 20px;
    background-color: black;
  }

  h3 {
    position: relative;
    font-size: 1.5rem;
    display: block;
    border-bottom: 1px solid white;
    font-family: var(--logo-font);
    color: white;
    text-align: center;
    z-index: 3;
    margin-bottom: var(--margin-inside-main);
  }

  .hype-text {
    color: var(--text-color-accent);
    // color: white;
  }

  .menu-button {
    display: inline-block;
    height: var(--menu-button-height);
    font-size: 0.8rem;
    padding: 5px;
    color: white;
    border: 1px solid white;
    text-align: center;
    line-height: var(--menu-button-height);
    // font-family: var(--logo-font);
    // animation
    transition: 0.5s ease;
  }
  .menu-button:hover {
    border: 1px solid var(--text-color-accent);
    color: var(--text-color-accent);
  }
  .input-area {
    display: block;
    margin: 0 auto;
    text-align: center;
  }

  input {
    height: 30px;
    width: calc(100% - var(--margin-inside-main));
    font-size: 1rem;
    padding: 5px;
    margin-bottom: var(--margin-inside-main);
    font-family: var(--logo-font);
    border: 1px solid white;
    background-color: black;
    color: white;
    text-align: center;
  }
  input:focus {
    outline-color: white;
  }

  .server-message {
    text-align: center;
  }
`;
