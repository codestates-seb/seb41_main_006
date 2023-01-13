import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../common/Title';
import ProfileImage from '../common/ProfileImage';
import { dummyChatList } from '../../static/dummyData';

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

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };
  return (
    <ul>
      {dummyChatList.map((chat) => (
        <ChatItem key={chat.id} onClick={() => handleChatClick(chat.id)}>
          <ProfileImage size="45px" />
          <div className="chatItem-content">
            <Title as="h2" size="xsmall">
              {chat.chatRoomName}
            </Title>
            <span>{chat.body}</span>
          </div>
        </ChatItem>
      ))}
    </ul>
  );
};

export default ChatList;
