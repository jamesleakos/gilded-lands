import styled from 'styled-components';
import '../../../styles/constants.css';

export const BiomeListStyled = styled.div`
  // this is always in a wrapper with grid-column set
  // grid-column: 1;
  padding: 0 var(--margin-outside-main);

  .underlined-title {
    margin-bottom: 20px;
  }

  .biometile-holder {
    // height set in realmpage css (.biome-list-wrapper .biometile-holder)
    // height: calc(100vh - var(--navbar-height) - 2 * var(--margin-outside-main) - var(--title-bar-height) - 100px);
    overflow-y: scroll;
    width: 100%;
    border-bottom: 1px solid var(--text-color-accent);
  }

  .biometile-holder::-webkit-scrollbar {
    display: none;
  }
`;