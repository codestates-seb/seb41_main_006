import styled from 'styled-components';
import PetInfoInput from '../PetInfoInput';
import ModalBackDrop from '../../ModalBackDrop';

const SContainer = styled.div`
  background-color: var(--bg-color);
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 45rem;
  max-height: 40rem;
  padding: 3rem;
  overflow: scroll;
  // 스크롤바 가리기
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const AddPetInfoModal = ({ setIsAddModalOpen }) => {
  const handleModalClose = () => {
    setIsAddModalOpen(false);
  };

  return (
    <ModalBackDrop>
      <SContainer onClick={(e) => e.stopPropagation()}>
        <PetInfoInput isEditMode={false} handleModalClose={handleModalClose} />
      </SContainer>
    </ModalBackDrop>
  );
};

export default AddPetInfoModal;
