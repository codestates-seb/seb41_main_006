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
