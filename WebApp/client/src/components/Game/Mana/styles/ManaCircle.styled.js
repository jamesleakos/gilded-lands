import styled from 'styled-components';

export const ManaCircleStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #b3b3b3;
  color: white;
  font-size: 1em;
  cursor: pointer;
  position: relative;
  pointer-events: ${(props) => (props.isPlayer ? 'auto' : 'none')};

  .player .mana-name {
    position: absolute;
    bottom: -20px;
    left: -50%;
    color: black;
  }

  .opponent .mana-name {
    position: absolute;
    top: -15px;
    left: -40%;
    color: black;
  }
`;
