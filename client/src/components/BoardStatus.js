import styled from 'styled-components';

export const BoardOpenBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  height: ${(props) => (props.height ? props.height : '24')}px;
  border-radius: 20px;
  padding: 3px 12px;
  font-size: 0.8rem;
  background-color: var(--main-color);
`;

export const BoardCloseBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  height: ${(props) => (props.height ? props.height : '24')}px;
  border-radius: 20px;
  padding: 3px 12px;
  font-size: 0.8rem;
  background-color: var(--sec-color);
`;
