import styled from 'styled-components';
import '../../../../styles/constants.css';

export const CardDisplayStyled = styled.div`
  grid-column: 2;
  grid-row: 1 / 100;
  height: calc(
    100vh - var(--title-bar-height) - var(--navbar-height) - 2 *
      var(--margin-outside-main)
  );
  border: 1px solid var(--border-color-dim);
  border-radius: 5px;
  padding: var(--margin-inside-main);
  margin: 0 var(--margin-inside-main);

  .filter-label {
    display: inline-block;
    margin-right: 10px;
    transition: color 0.3s ease, transform 0.3s ease;
  }

  .filter-label:hover {
    color: red;
    transform: scale(1.1);
  }

  .filter-label.active {
    color: red;
  }
`;
