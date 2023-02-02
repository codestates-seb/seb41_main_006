import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../common/Title';
import ProfileImage from '../common/ProfileImage';

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

const ChatList = ({ chattingList }) => {
  const navigate = useNavigate();
  const memberId = Number(localStorage.getItem('memberId'));

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
