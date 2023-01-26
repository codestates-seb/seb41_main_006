import { useMutation, useQueryClient } from 'react-query';
import useForm from '../../../hooks/useForm';
import styled from 'styled-components';
// import Container from '../Container';
import MemberInfoInput from '../../signup/MemberInfoInput';
// import EditMemberInfoCard from '../EditMemberInfoCard';
import ModalBackDrop from '../../ModalBackDrop';
import memberInfoValidate from '../../../utils/memberInfoValidate';
import { updateMyInfo } from '../../../api/member/member';
import { memberImageUpload, memberImageDelete } from '../../../api/image';

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
  const queryClient = useQueryClient();

  const updateMyInfoMutation = useMutation(updateMyInfo, {
    onSuccess: () => {
      // invalidates cache and refetcn
      // 모달창 닫음
      setIsEditModalOpen(false);
      queryClient.invalidateQueries('myInfo');
    },
  });
  const handleModalClose = () => {
    setIsEditModalOpen(false);
  };

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
      let imageInfo = null;
      try {
        // 이미지 파일이 존재하면
        if (memberInfoForm.values.profileImageFile) {
          imageInfo = await memberImageUpload(
            memberInfoForm.values.profileImageFile
          );
        }
        console.log('업로드 된 이미지 정보', imageInfo);
        // 받아온 이미지 아이디 정보 넘겨줘야 함
        updateMyInfoMutation.mutate({
          memberId: memberInfo.memberId,
          data: {
            ...memberInfoForm.values,
            // 업로드 된 이미지 아이디 정보
            profileImageId: imageInfo?.upFileId,
            // response body에 필요한 정보들
            email: memberInfo.email,
            memberStatus: memberInfo.memberStatus,
          },
        });
      } catch (err) {
        // 요청이 실패했는데 벌써 이미지가 업로드 된 상황이라면...
        if (imageInfo) {
          console.log('멤버 수정 모달: 요청 실패하여 이미지 삭제함');
          await memberImageDelete(imageInfo.upFileUrl);
        }
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
