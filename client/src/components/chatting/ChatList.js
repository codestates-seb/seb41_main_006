import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../common/Title';
import ProfileImage from '../common/ProfileImage';
import { useEffect, useState } from 'react';
import authRequest from '../../api/authRequest';

const ChatItem = styled.li`
  display: flex;
  height: 5rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  span {
    font-size: 0.75rem;
  }

  > .chatItem-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 0.75rem;
  }

  &:hover {
    background-color: var(--bg-dark-color);
  }
`;

const ChatList = () => {
  const navigate = useNavigate();
  const [chattingList, setChattingList] = useState([]);
  const [roomId, setRoomId] = useState('');
  const memberId = Number(localStorage.getItem('memberId'));
  useEffect(() => {
    const GetChatList = async () => {
      await authRequest
        .get('/chats')
        .then((res) => {
          setChattingList(res.data.data);
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    GetChatList();
  }, [roomId]);

  const handleChatClick = (roomId) => {
    navigate(`/chat/${roomId}`);
    setRoomId(roomId);
  };
  return (
    <ul>
      {chattingList.map((chat) => (
        <ChatItem
          key={chat.roomId}
          onClick={() => handleChatClick(chat.roomId)}
        >
          <ProfileImage
            size="45px"
            src={
              memberId === chat.receiver.memberId
                ? chat.sender.profileImage?.upFileUrl
                : chat.receiver.profileImage?.upFileUrl
            }
          />
          <div className="chatItem-content">
            <Title as="h2" size="xsmall">
              {memberId === chat.receiver.memberId
                ? chat.sender.nickName
                : chat.receiver.nickName}
            </Title>
          </div>
        </ChatItem>
      ))}
    </ul>
  );
};

export default ChatList;
