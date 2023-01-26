import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../common/Title';
import ProfileImage from '../common/ProfileImage';
import { useEffect, useState } from 'react';
import instance from '../../api/axiosConfig';

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
  useEffect(() => {
    const AccessToken = localStorage.getItem('AccessToken');
    const GetChatList = async () => {
      await instance
        .get('/chats', {
          headers: {
            Authorization: AccessToken,
          },
        })
        .then((res) => {
          setChattingList(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    GetChatList();
  }, []);
  const handleChatClick = (roomId) => {
    navigate(`/chat/${roomId}`);
  };
  return (
    <ul>
      {chattingList.map((chat) => (
        <ChatItem
          key={chat.roomId}
          onClick={() => handleChatClick(chat.roomId)}
        >
          <ProfileImage size="45px" />
          <div className="chatItem-content">
            <Title as="h2" size="xsmall">
              {chat.receiver.nickName}
            </Title>
            <span>채팅 내용</span>
          </div>
        </ChatItem>
      ))}
    </ul>
  );
};

export default ChatList;
