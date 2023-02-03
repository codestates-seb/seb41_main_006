import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Title from '../common/Title';
import EditMemberModal from './Modal/EditMemberModal';
import MemberInfoCard from './MemberInfoCard';
import { getMyInfo, deleteMember } from '../../api/member/member';
import { openModal } from '../../store/modules/modalSlice';
import { useNavigate } from 'react-router-dom';

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  gap: 1.5rem;
  .edit-account {
    width: 15%;
    height: 40px;
    background-color: var(--sec-color);
    color: white;
    font-size: 1.2rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    :hover {
      background-color: var(--main-font-color);
      color: white;
    }
  }
  .delete-account {
    cursor: pointer;
    background-color: var(--bg-color);
    border: none;
    :visited {
      color: var(--sec-color);
    }
  }
`;

const MemberInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 로컬 스토리지에 저장된 멤버 아이디
  const memberId = localStorage.getItem('memberId');

  const { data: memberInfo, isLoading } = useQuery(
    // memberId가 변화할 때마다 fetch
    ['myInfo', memberId],
    async () => await getMyInfo(memberId)
  );

  const deleteMemberMutation = useMutation(deleteMember, {
    onSuccess: () => {
      navigate('/');
      queryClient.invalidateQueries(['myInfo']);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleMemberDelete = (memberId) => {
    deleteMemberMutation.mutate({
      memberId,
    });
  };

  const handleClickDeleteMember = () => {
    dispatch(
      openModal({
        type: 'delete',
        props: {
          memberId: memberInfo.memberId,
          handleMemberDelete,
          message: '모든 회원 정보가 삭제됩니다. 회원 탈퇴 하시겠습니까?',
        },
      })
    );
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <UserInfoContainer>
        <Title as="h2">나의 정보</Title>
        <MemberInfoCard memberInfo={memberInfo} />
        <button
          className="edit-account"
          onClick={() => {
            setIsEditModalOpen(true);
          }}
        >
          정보 수정
        </button>
        <button className="delete-account" onClick={handleClickDeleteMember}>
          회원 탈퇴
        </button>
      </UserInfoContainer>
      {isEditModalOpen ? (
        <EditMemberModal
          setIsEditModalOpen={setIsEditModalOpen}
          memberInfo={memberInfo}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default MemberInfo;
