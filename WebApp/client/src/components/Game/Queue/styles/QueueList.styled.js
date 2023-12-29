import styled from 'styled-components';
import '../../../../styles/constants.css';

export const QueueListStyled = styled.div`
  position: absolute;
  right: 0;
  top: 15%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.amActive ? '30%' : '3%')};
  z-index: 600;
  background-color: white;

  .triangle-button {
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 10px;
    height: 20px;
    width: 20px;
    font-size: 20px;
    color: black;
    z-index: 601;
  }

  .queue-content {
    position: relative;
    display: ${(props) => (props.amActive ? 'block' : 'none')};
    height: 100%;
    width: 100%;
  }

  .queuelines {
    width: calc(100% - 40px);
    position: absolute;
    right: 0;
    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .play-button {
    color: black;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
