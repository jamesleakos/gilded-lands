import styled from 'styled-components';

const MidpointStyled = styled.div.attrs((props) => ({
  style: {
    left: `${props.midpoint.x}px`,
    top: `${props.midpoint.y}px`,
  },
}))`
  position: absolute;
  background-color: ${(props) => props.color};
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  pointer-events: all;
  z-index: 600;
`;

const ArrowStyled = styled.div`
  pointer-events: none;
  z-index: 9999;

  .svg-arrow {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

export { MidpointStyled, ArrowStyled };
