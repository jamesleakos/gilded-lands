import styled from 'styled-components';
import '../../../styles/constants.css';

export const RealmListStyled = styled.div`
  grid-column: 1;
  padding: 0 var(--margin-outside-main);
  height: calc(100vh - var(--navbar-height) - 2 * var(--margin-outside-main) - 2px);
  // border-right: 1px solid var(--border-color-dim);

  .underlined-title {
    margin-bottom: 20px;
  }

  .realmtile-holder {
    height: calc(100vh - var(--navbar-height) - 2 * var(--margin-outside-main) - var(--title-bar-height) - 40px);
    overflow-y: scroll;
    width: 100%;
    border-bottom: 1px solid var(--text-color-accent);
  }

  .realmtile-holder::-webkit-scrollbar {
    display: none;
  }

  .ui-button {
    margin-bottom: 10px;
  }
`;