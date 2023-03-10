import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import scrollTodown from '../../utils/scrollTodown';

const MyChatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  margin-bottom: 0.2rem;

  .sender-chat {
    margin-left: auto;
    margin-bottom: 0.2rem;
    border-radius: 10px 10px 0px 10px;
    background-color: var(--main-color);
    max-width: 100%;
    padding: 0.25rem 0.75rem;
    color: white;
    font-size: 1rem;
  }
  .receiver-chat {
    margin-right: auto;
    margin-bottom: 0.2rem;
    border-radius: 10px 10px 10px 0px;
    background-color: var(--bg-dark-color);
    max-width: 100%;
    padding: 0.25rem 0.75rem;
    color: var(--main-font-color);
    font-size: 1rem;
  }
`;
const ChattingArea = ({ messageList, prechat }) => {
  const memberId = Number(localStorage.getItem('memberId'));
  const scrollRef = useRef();

  useEffect(() => {
    scrollTodown(scrollRef);
  }, [messageList]);

  useEffect(() => {
    scrollTodown(scrollRef);
  });
  return (
    <>
      <MyChatBox ref={scrollRef}>
        {prechat.length === 0 ? (
          <div></div>
        ) : (
          prechat.map((el) => {
            return (
              <div
                key={el.messageId}
                className={
                  memberId === el.sender.memberId
                    ? 'sender-chat'
                    : 'receiver-chat'
                }
              >
                {el.content}
              </div>
            );
          })
        )}
        {messageList.map((el, index) => {
          return (
            <div
              key={index}
              className={
                memberId === el.senderId ? 'sender-chat' : 'receiver-chat'
              }
            >
              {el.content}
            </div>
          );
        })}
      </MyChatBox>
    </>
  );
};

export default ChattingArea;
