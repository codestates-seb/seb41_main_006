import styled from 'styled-components';

const ModalBackDrop = styled.div`
  position: fixed; // 보이는 화면에서 위치가 고정
  top: 0;
  bottom: 0;
  left: 0;
  right: 0; // 전체 화면에 요소를 꽉 채울 때!
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

export default ModalBackDrop;
