import styled from 'styled-components';
import { useRef } from 'react';
// import Container from '../Container';
import EditMemberInfoCard from '../EditMemberInfoCard';
import { PostSubmitBtn } from '../../Button';

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
  align-items: center;
`;
const ModalContainer = styled.div`
  background-color: var(--bg-color);
  text-align: center;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
const Submitbtn = styled(PostSubmitBtn)`
  margin: 30px 0;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 10px;
`;

const EditMemberModal = ({ Modal, setModal }) => {
  const outside = useRef();

  const handleModalClose = (e) => {
    if (Modal && outside.current === e.target) {
      setModal(false);
    }
  };
  return (
    <SBackground
      ref={outside}
      onClick={(e) => {
        handleModalClose(e);
      }}
    >
      <ModalContainer>
        <EditMemberInfoCard />
        <Submitbtn
          onClick={() => {
            setModal(!Modal);
          }}
        >
          수정 완료
        </Submitbtn>
      </ModalContainer>
    </SBackground>
  );
};

export default EditMemberModal;
