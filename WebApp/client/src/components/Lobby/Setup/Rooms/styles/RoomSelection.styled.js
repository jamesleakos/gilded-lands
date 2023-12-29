import styled from 'styled-components';
import '../../../../../styles/constants.css';

export const RoomSelectionStyled = styled.div`
  padding: var(--margin-outside-main);
  height: 600px;

  .underlined-title {
    margin-bottom: 10px;
  }

  .button-bar {
    margin-bottom: 10px;
  }

  .menu-button {
    display: inline-block;
    margin-right: 10px;
    font-size: .8rem;
    padding: 5px;
    color: var(--text-color-secondary);
    border: 1px solid var(--border-color-dim);
    transition: 0.5s ease;
  }

  .menu-button:hover {
    border: 1px solid var(--border-color-bright);
    color: var(--border-color-bright);
    transform: scale(1.05);
    -webkit-transform: scale(1.05);
  }

  button {
    display: inline-block;
  ]
`;
