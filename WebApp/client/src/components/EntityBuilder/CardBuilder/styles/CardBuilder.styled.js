import styled from 'styled-components';
import '../../../../styles/constants.css';

export const CardBuilderStyled = styled.div`
  padding: 5px 0 0 40px;
  position: relative;

  .card-name {
    font-size: 1.5rem;
    margin: 10px 0 5px 0;
  }

  .tab-button {
    display: inline-block;
    margin: 10px 10px 20px 0;
    color: grey;
    font-weight: normal;
  }

  .tab-button.active {
    color: white;
    font-weight: bold;
  }

  .delete-card-button {
    position: absolute;
    top: 5px;
    right: 5px;
  }
`;
