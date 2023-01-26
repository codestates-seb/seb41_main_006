import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ChattingArea from './ChattingArea';
import * as StompJs from '@stomp/stompjs';

const ChatRoomBox = styled.div`
  height: calc(100vh - var(--header-height));
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ChatBox = styled.div`
  overflow: scroll;
  height: calc(100% - 3rem);
  padding-bottom: 1rem;
`;

const ChatInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  gap: 0.5rem;

  > .chat-input {
    flex: 1;
    height: 100%;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    border: 1px solid var(--sec-color);
    font-size: 1rem;
  }

  > .chat-submit {
    height: 100%;
    padding: 1rem;
    background-color: var(--sec-color);
    border-radius: 5px;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
  }
`;

const ChatRoom = () => {
  const { chatId } = useParams();
  const chatInputRef = useRef();
  const client = useRef({});
  const AccessToken = localStorage.getItem('AccessToken');

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL:
        'ws://ec2-3-39-12-49.ap-northeast-2.compute.amazonaws.com:8080/ws/websocket',
      connectHeaders: { Authorization: AccessToken },
      onConnect: () => {
        console.log('success');
        subscribe();
      },
      debug: function (str) {
        console.log(str);
      },
    });
    client.current.activate();
  };
  const disconnect = () => {
    // 연결이 끊겼을 때
    client.current.deactivate();
  };

  const subscribe = () => {
    const headers = { headers: AccessToken };
    client.current.subscribe(
      `/sub/chats/${chatId}`,
      (body) => {
        const json_body = JSON.parse(body.body);
        console.log(json_body);
      },
      headers
    );
  };

  useEffect(() => {
    // 채팅방 입장 시 input에 바로 focus
    chatInputRef.current.focus();
  }, [chatId]);

  useEffect(() => {
    connect();

    return () => disconnect();
  });

  return (
    <ChatRoomBox>
      <ChatBox>
        <ChattingArea />
      </ChatBox>
      <ChatInputBox>
        <input
          ref={chatInputRef}
          placeholder="hi"
          className="chat-input"
          type="text"
        ></input>
        <button className="chat-submit">전송</button>
      </ChatInputBox>
    </ChatRoomBox>
  );
};

export default ChatRoom;
