import styled from 'styled-components';

export const ManaBarStyled = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  width: 100%;
  z-index: 500;
  bottom: ${(props) => (props.isPlayer ? '-25px' : 'auto')};
  top: ${(props) => (props.isPlayer ? 'auto' : '-25px')};
  pointer-events: none;

  .mana-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .forest-mana,
  .ocean-mana,
  .desert-mana,
  .mountain-mana,
  .prairie-mana,
  .fells-mana,
  .tundra-mana {
    // Add your specific styles for each mana circle here
  }
`;
