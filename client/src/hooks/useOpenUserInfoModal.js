import { openModal } from '../store/modules/modalSlice';
import { useDispatch } from 'react-redux';

const useOpenUserInfoModal = (userId) => {
  const dispatch = useDispatch();

  const openUserInfoModal = () => {
    dispatch(openModal({ type: 'user', props: { userId } }));
  };

  return openUserInfoModal;
};

export default useOpenUserInfoModal;
