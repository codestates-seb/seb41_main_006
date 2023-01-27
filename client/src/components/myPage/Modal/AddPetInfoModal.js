import styled from 'styled-components';
import PetInfoInput from '../PetInfoInput';
import { PostSubmitBtn } from '../../Button';
import ModalBackDrop from '../../ModalBackDrop';

const SContainer = styled.div`
  background-color: var(--bg-color);
  border-radius: 5%;
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

const AddButton = styled(PostSubmitBtn)`
  font-size: 1.2rem;
  border-radius: 4px;
  margin-top: 5%;
  :hover {
    background-color: var(--main-font-color);
  }
`;

const AddPetInfoModal = ({ setIsAddModalOpen }) => {
  const handleModalClose = () => {
    setIsAddModalOpen(false);
  };

  return (
    <ModalBackDrop onClick={handleModalClose}>
      <SContainer onClick={(e) => e.stopPropagation()}>
        <PetInfoInput isEditMode={false} />
        <AddButton
          onClick={() => {
            setIsAddModalOpen(false);
          }}
        >
          추가하기
        </AddButton>
      </SContainer>
    </ModalBackDrop>
  );
};

export default AddPetInfoModal;
