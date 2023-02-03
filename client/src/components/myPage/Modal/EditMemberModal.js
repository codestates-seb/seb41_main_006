import styled from 'styled-components';
// import Container from '../Container';
import MemberInfoInput from '../../signup/MemberInfoInput';
// import EditMemberInfoCard from '../EditMemberInfoCard';
import ModalBackDrop from '../../ModalBackDrop';

const ModalContainer = styled.div`
  background-color: var(--bg-color);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
  padding-bottom: 3rem;
  border-radius: 10px;
  width: 30rem;
  height: 40rem;
  overflow-y: scroll;
  // 스크롤바 가리기
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const EditMemberModal = ({ setIsEditModalOpen, memberInfo }) => {
  const handleModalClose = () => {
    setIsEditModalOpen(false);
  };

  return (
    <ModalBackDrop onClick={handleModalClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <MemberInfoInput
          isEditMode={true}
          memberInfo={memberInfo}
          handleModalClose={handleModalClose}
        />
      </ModalContainer>
    </ModalBackDrop>
  );
};

export default EditMemberModal;
