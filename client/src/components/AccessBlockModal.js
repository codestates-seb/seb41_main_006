import styled from 'styled-components';
import { PostSubmitBtn } from './Button';
import { RiAlertFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { closeModal } from '../store/modules/modalSlice';

const ModalInner = styled.div`
  position: fixed;
  top: ${(props) => (props.pointY ? props.pointY + 'px' : '50%')};
  left: ${(props) => (props.pointX ? props.pointX + 'px' : '50%')};
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid var(--line-color);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: space-around;
  padding: 40px 50px;

  .modal-message {
    color: #faac30;
    font-size: 17px;
  }

  .modal-message span {
    width: 100%;
    text-align: center;
    white-space: pre-wrap;
    line-height: 2rem;
    font-size: 18px;
    color: #401809;
    font-weight: bold;
    padding-left: 6px;
  }

  .modal-btn {
    margin-top: 20px;
    text-align: center;
    /* display: flex;
    justify-content: space-between; */

    .btn {
      border-radius: 10px;
      font-size: 18px;
    }

    .btn + .btn {
      margin-left: 16px;
    }
  }
`;

const AccessBlockModal = () => {
  const dispatch = useDispatch();

  const handleCloseClick = () => {
    dispatch(closeModal({ type: 'delete' }));
  };

  return (
    <ModalInner>
      <div className="modal-message">
        <RiAlertFill />
        <span>로그인 후 사용해주세요</span>
      </div>
      <div className="modal-btn">
        <PostSubmitBtn
          height="38"
          type="button"
          className="btn"
          onClick={handleCloseClick}
        >
          확인
        </PostSubmitBtn>
        <PostSubmitBtn
          height="38"
          type="button"
          className="btn"
          onClick={handleCloseClick}
        >
          취소
        </PostSubmitBtn>
      </div>
    </ModalInner>
  );
};

export default AccessBlockModal;
