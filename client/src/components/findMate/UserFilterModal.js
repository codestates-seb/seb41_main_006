import styled from 'styled-components';
import Title from '../common/Title';
import UserFilterForm from './UserFilterForm';
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
  z-index: 30;
`;

const UserFilterModalView = styled.div`
  padding: 1rem 2rem;
  width: 27.5rem;
  height: 40rem;
  border-radius: 10px;
  background-color: var(--bg-color);
`;

const UserFilterModal = ({ setIsFilterModalOpen }) => {
  const closeModalHandler = () => {
    setIsFilterModalOpen(false);
  };
  return (
    <ModalBackDrop onClick={closeModalHandler}>
      <UserFilterModalView onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModalHandler}>취소</button>
        <Title size="small">어떤 산책 메이트를 원하시나요?</Title>
        <UserFilterForm />
      </UserFilterModalView>
    </ModalBackDrop>
  );
};

export default UserFilterModal;
