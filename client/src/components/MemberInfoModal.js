import { useEffect, useState } from 'react';
import PetInfoCard from './myPage/PetInfoCard';
import { getMemberInfo } from '../api/member/member';
import styled from 'styled-components';
import MemberInfoCard from './myPage/MemberInfoCard';
import Button from './common/Button';
import { Link } from 'react-router-dom';
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
  console.log(memberId);
  const [member, setMember] = useState({
    petsInfo: [],
  });
  const AccessToken = localStorage.getItem('AccessToken');
  const dispatch = useDispatch();

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
    getMemberInfo(memberId)
      .then((data) => {
        console.log(data);
        setMember(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [memberId]);

  return (
    <SContainer>
      <div className="memberInfo-container">
        <MemberInfoCard memberInfo={member} />
        <Link to="/chat">
          <Button
            onClick={() => {
              handleModal();
              AddChatList(member.memberId);
            }}
          >
            채팅하기
          </Button>
        </Link>
      </div>
      <div className="petInfo-container">
        <h2>강아지 소개</h2>
        <PetInfoCard pet={member.petsInfo[0]} />
      </div>
    </SContainer>
  );
};

export default MemberInfoModal;
