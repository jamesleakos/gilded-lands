import styled from 'styled-components';

export const RoomTileStyled = styled.div`
  --interior-border-margin: 5px;

  display: inline-block;
  height: 400px;
  width: 250px;
  margin-right: 10px;
  padding: 20px;
  transition: 0.5s;
  position: relative;
  border-radius: 5px;

  // background image stuff
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  :hover {
    transform: scale(1.02);
    -webkit-transform: scale(1.02);

    .room-title {
      border-bottom: 2px solid var(--border-color-bright);
    }
  }

  .interior-border {
    position: absolute;
    top: var(--interior-border-margin);
    left: var(--interior-border-margin);
    right: var(--interior-border-margin);
    bottom: var(--interior-border-margin);
    border: 1px solid var(--border-color-dim);
    border-radius: 5px;
    transition: 0.5s;
  }
  .interior-border:hover {
    border-color: var(--border-color-bright);
    border-width: 2px;
  }
  .interior-border.selected {
    border: 2px solid var(--border-color-bright);
  }

  .room-title {
    border-bottom: 1px solid var(--border-color-dim);
    margin-bottom: 10px;
    transition: 0.5s;
  }
  .room-title.selected {
    border-bottom: 1px solid var(--border-color-bright);
  }
`;
