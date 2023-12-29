import styled from 'styled-components';
import '../../../../styles/constants.css';

export const CardStyled = styled.div`
  width: 300px;
  height: 400px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  background-color: #f4f4f4;
`;

export const CardTitle = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #1a1a1a;
`;

export const CardImage = styled.img`
  width: 80%;
  height: 50%;
`;

export const CardStats = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 10px 0;
`;

export const CardStat = styled.span`
  font-size: 1.2em;
  color: #1a1a1a;
`;
