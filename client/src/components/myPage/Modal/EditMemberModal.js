import useForm from '../../../hooks/useForm';
import styled from 'styled-components';
// import Container from '../Container';
import MemberInfoInput from '../../signup/MemberInfoInput';
// import EditMemberInfoCard from '../EditMemberInfoCard';
import ModalBackDrop from '../../ModalBackDrop';
import memberInfoValidate from '../../../utils/memberInfoValidate';

const ModalContainer = styled.div`
  background-color: var(--bg-color);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
  padding-bottom: 3rem;
  border-radius: 10px;
  width: 30rem;
  height: 40rem;
  overflow-y: scroll;
`;

const EditMemberModal = ({ setIsEditModalOpen, memberInfo }) => {
  const handleModalClose = () => setIsEditModalOpen(false);

  const memberInfoForm = useForm({
    initialValues: {
      nickName: '',
      memberAge: '',
      address: '',
      gender: '',
      aboutMe: '',
      profileImageFile: null,
      profileImageId: null,
    },
    onSubmit: async () => {
      try {
        console.log(memberInfoForm.values);
        console.log('hi');
      } catch (err) {
        console.log(err);
      }
    },
    validate: memberInfoValidate,
  });

  return (
    <ModalBackDrop onClick={handleModalClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <MemberInfoInput
          isEditMode={true}
          memberInfoForm={memberInfoForm}
          memberInfo={memberInfo}
        />
      </ModalContainer>
    </ModalBackDrop>
  );
};

export default EditMemberModal;
