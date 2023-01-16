import styled from 'styled-components';
import EditPetCard from '../EditPetCard';
import { CancelButton, PostSubmitBtn } from '../../Button';
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

const EditPetModal = ({ setEditModal, EditModal }) => {
  const outside = useRef();

  const handleModalClose = (e) => {
    if (EditModal && outside.current === e.target) {
      setEditModal(false);
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
        <div className="button-container">
          <PostSubmitBtn>수정</PostSubmitBtn>
          <CancelButton
            onClick={() => {
              setEditModal(!EditModal);
            }}
          >
            취소
          </CancelButton>
        </div>
      </SContainer>
    </SBackground>
  );
};

export default EditPetModal;
