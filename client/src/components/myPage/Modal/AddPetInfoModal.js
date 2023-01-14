import EditPetCard from '../EditPetCard';
import styled from 'styled-components';
import { PostSubmitBtn } from '../../Button';
import { useRef } from 'react';

const SBackground = styled.div`
  background-color: rgba(217, 217, 217, 0.8);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
`;
const SContainer = styled.div`
  background-color: var(--bg-color);
  border-radius: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 2%;
  height: 90%;
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

const AddPetInfoModal = ({ AddModal, setAddModal }) => {
  const outside = useRef();

  const handleModalClose = (e) => {
    if (AddModal && outside.current === e.target) {
      setAddModal(false);
    }
  };
  return (
    <SBackground
      ref={outside}
      onClick={(e) => {
        handleModalClose(e);
      }}
    >
      <SContainer>
        <EditPetCard />
        <AddButton
          onClick={() => {
            setAddModal(!AddModal);
          }}
        >
          추가하기
        </AddButton>
      </SContainer>
    </SBackground>
  );
};

export default AddPetInfoModal;
