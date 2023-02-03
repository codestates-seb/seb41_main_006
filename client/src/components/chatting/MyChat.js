import styled from 'styled-components';

const MyChatBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin-bottom: 0.2rem;

  > .chat {
    margin-left: auto;
    border-radius: 10px 10px 0px 10px;
    background-color: var(--main-color);
    max-width: 60%;
    padding: 0.25rem 0.75rem;
    color: white;
    font-size: 1rem;
  }
`;

const MyChat = () => {
  return (
    <MyChatBox>
      <div className="chat">안녕하세요! 저도 산책 참여 가능한가요?</div>
    </MyChatBox>
  );
};

export default MyChat;
