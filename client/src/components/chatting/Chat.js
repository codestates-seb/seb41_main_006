import styled from 'styled-components';

const ChatBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin-bottom: 0.2rem;

  > .chat {
    margin-right: auto;
    border-radius: 10px 10px 10px 0px;
    background-color: var(--bg-dark-color);
    max-width: 60%;
    padding: 0.25rem 0.75rem;
    color: var(--main-font-color);
    font-size: 1rem;
  }
`;

const MyChat = () => {
  return (
    <ChatBox>
      <div className="chat">안녕하세요! 네 참여 가능합니다!</div>
    </ChatBox>
  );
};

export default MyChat;
