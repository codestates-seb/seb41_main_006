import { useEffect, useState } from 'react';
import PetInfoCard from './myPage/PetInfoCard';
import { getMemberInfo } from '../api/member/member';
import styled from 'styled-components';
import MemberInfoCard from './myPage/MemberInfoCard';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeModal } from '../store/modules/modalSlice';
import instance from '../api/axiosConfig';

const SContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 46em;
  height: 28rem;
  background-color: var(--bg-color);
  border-radius: 10px;
  padding: 1rem;

  > .memberInfo-container {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;

    > button {
      margin-top: 1rem;
      width: 10rem;
    }
  }

  > .petInfo-container {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const MemberInfoModal = ({ memberId }) => {
  const [member, setMember] = useState({
    pets: [],
  });
  const AccessToken = localStorage.getItem('AccessToken');
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleModal = () => {
    dispatch(closeModal());
  };
  const AddChatList = async (memberId) => {
    await instance
      .post(
        '/chats',
        {
          memberId: memberId,
        },
        {
          headers: { Authorization: AccessToken },
        }
      )
      .then((data) => console.log(data));
  };

  useEffect(() => {
    getMemberInfo(memberId).then((data) => {
      console.log(data);
      setMember(data);
    });
  }, [memberId]);

  return (
    <SContainer>
      <div className="memberInfo-container">
        <MemberInfoCard memberInfo={member} />

        <Button
          onClick={() => {
            handleModal();
            AddChatList(member.memberId);
            Navigate('/chat');
          }}
        >
          채팅하기
        </Button>
      </div>
      <div className="petInfo-container">
        <h2>강아지 소개</h2>
        <PetInfoCard pet={member.pets[0]} />
      </div>
    </SContainer>
  );
};

export default MemberInfoModal;
