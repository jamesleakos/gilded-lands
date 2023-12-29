import styled from 'styled-components';
import '../../../styles/constants.css';

export const NavbarStyled = styled.div`
  // define some constants
  --border-color: var(--color-background-secondary);

  // navbar holder essentially
  position: sticky;
  top: 0;
  z-index: 10;

  .navbar-top {
    height: var(--nav-bar-height);
  }

  .navbar {
    position: relative;
    margin: 0;
    background-color: var(--color-background-navbar);
    color: var(--text-color-secondary);
    border: 1px solid var(--border-color);
    display: grid;
    z-index: 10;
  }

  .desktop-navbar {
    grid-template-columns: 20px 100px 100px 100px 1fr 100px 100px 100px 20px;
  }

  .navbar-item {
    border: solid var(--border-color);
    border-width: 0 1px;
    text-align: center;
    line-height: var(--nav-bar-height);
    color: var(--text-color-secondary);
  }

  .navbar-title {
    display: inline-block;
    text-align: center;
    line-height: var(--navbar-height);
    overflow: hidden;
  }

  .desktop-navbar .navbar-item {
    width: 100px;
  }

  .mobile-navbar {
    grid-template-columns: 50px 1fr 50px;
    border-bottom: 1px solid var(--border-color);
  }

  .mobile-navbar .navbar-item {
    width: 50px;
    line-height: var(--nav-bar-height);
  }

  .navbar-title {
    margin-left: auto;
    margin-right: auto;
  }

  .navbar-title h3 {
    font-family: var(--logo-font);
    line-height: var(--nav-bar-height);
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    color: red;
  }

  .clickable-link {
    color: var(--text-color-secondary);
    line-height: var(--navbar-height);
    display: table;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    text-decoration: none;
    transition: 0.5s ease;
  }

  .clickable-link:hover {
    color: var(--text-color-accent);
    transform: scale(1.05);
    -webkit-transform: scale(1.05);
  }

  .icon {
    display: inline-block;
  }
`;
