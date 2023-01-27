import styled from 'styled-components';
import PetInfoInput from '../PetInfoInput';
import ModalBackDrop from '../../ModalBackDrop';

const SContainer = styled.div`
  background-color: var(--bg-color);
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 2%;
  width: 60rem;
  height: 85%;
  padding: 3%;
  .button-container {
    button {
      margin: 10% 50px 0 50px;
      font-size: 1.2rem;
      font-weight: 700;
      border-radius: 4px;
    }
  }
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
