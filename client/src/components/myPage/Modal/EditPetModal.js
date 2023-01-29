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
`;

const EditPetModal = ({ pet, setIsEditModalOpen }) => {
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };
  return (
    <ModalBackDrop>
      <SContainer>
        <PetInfoInput
          isEditMode={true}
          handleModalClose={handleEditModalClose}
          petInfo={pet}
        />
        <div className="button-container"></div>
      </SContainer>
    </ModalBackDrop>
  );
};

export default EditPetModal;
