import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../store/modules/modalSlice';
import LoginModal from './login/LoginModal';
import styled from 'styled-components';
import MemberInfoModal from './MemberInfoModal';
import DeleteModal from './DeleteModal';

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
  z-index: 999;
`;

const ModalContainer = styled.div`
  height: max-content;
  width: max-content;
`;

const MODAL_COMPONENTS = {
  login: LoginModal,
  member: MemberInfoModal,
  delete: DeleteModal,
};

const GlobalModal = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { type, props } = useSelector((state) => state.modal);

  // 띄울 모달을 type을 통해 지정한다.
  const Modal = MODAL_COMPONENTS[type];

  // 모달 외부를 클릭했을 때 모달은 닫힌다.
  const handleModalClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    dispatch(closeModal());
  }, [location.pathname]);

  // type이 명시되지 않았다면 아무것도 띄우지 않는다.
  if (!type) return null;

  return (
    <ModalBackDrop onClick={handleModalClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Modal {...props}></Modal>
      </ModalContainer>
    </ModalBackDrop>
  );
};

export default GlobalModal;
