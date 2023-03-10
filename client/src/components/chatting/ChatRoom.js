import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ChattingArea from './ChattingArea';
import * as StompJs from '@stomp/stompjs';
import authRequest from '../../api/authRequest';

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

const ChatInputBox = styled.form`
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
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [prechat, setPrechat] = useState([]);
  const { chatId } = useParams();
  const chatInputRef = useRef();
  const client = useRef({});
  const AccessToken = localStorage.getItem('AccessToken');
  const memberId = localStorage.getItem('memberId');

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: process.env.REACT_APP_CHAT_API,
      connectHeaders: { Authorization: AccessToken },
      onConnect: () => {
        console.log('success');
        subscribe();
      },
    });
    client.current.activate();
  };
  const disconnect = () => {
    // 연결이 끊겼을 때
    client.current.deactivate();
  };

  const subscribe = () => {
    client.current.subscribe(`/sub/chats/${chatId}`, (body) => {
      const json_body = JSON.parse(body.body);
      setMessageList((chatlist) => [...chatlist, json_body]);
    });
  };
  const publish = (message) => {
    if (!client.current.connected) return; // 연결되지 않았으면 메시지를 보내지 않는다.

    client.current.publish({
      destination: `/pub/chats/messages/${chatId}`,
      body: JSON.stringify({
        roomId: chatId,
        senderId: memberId,
        content: message,
      }),
    });
    setMessage('');
  };
  const handleSubmit = (e, message) => {
    // 보내기 버튼 눌렀을 때 publish
    e.preventDefault();
    if (message === '') {
      alert('메세지를 입력해 주세요');
      return;
    }
    publish(message);
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
  };
  //채팅방이 바뀔 때 마다 채팅리스트 다시 불러옴
  useEffect(() => {
    const Getchat = async () => {
      await authRequest
        .get(`/chats/messages/${chatId}?page=1&size=20`)
        .then((res) => {
          const chatdata = res.data.data.slice(0).reverse();
          setPrechat(chatdata, ...prechat);
        });
    };
    Getchat();
  }, [chatId]);

  useEffect(() => {
    // 채팅방 입장 시 input에 바로 focus
    chatInputRef.current.focus();
  }, [chatId]);

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  return (
    <ChatRoomBox>
      <ChatBox>
        <ChattingArea
          messageList={messageList}
          setMessageList={setMessageList}
          prechat={prechat}
        />
      </ChatBox>
      <ChatInputBox onSubmit={(e) => handleSubmit(e, message)}>
        <input
          ref={chatInputRef}
          placeholder="hi"
          className="chat-input"
          type="text"
          onChange={handleInput}
          value={message}
        ></input>
        <button className="chat-submit" type="submit">
          전송
        </button>
      </ChatInputBox>
    </ChatRoomBox>
  );
};

export default ChatRoom;
