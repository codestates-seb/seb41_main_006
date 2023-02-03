import Container from '../components/Container';
import styled from 'styled-components';
import Title from '../components/common/Title';
import ChatList from '../components/chatting/ChatList';
import ChatRoom from '../components/chatting/ChatRoom';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import authRequest from '../api/authRequest';

const ChattingPageContainer = styled(Container)`
  display: flex;
  > .side-bar {
    width: 20rem;
    > h1 {
      padding-left: 1rem;
      padding-top: 1rem;
    }
  }

  > .content {
    background-color: white;
    width: calc(100% - 20rem);
  }
`;

const ChattingPage = () => {
  const [chattingList, setChattingList] = useState([]);

  useEffect(() => {
    const GetChatList = async () => {
      await authRequest
        .get('/chats')
        .then((res) => {
          setChattingList(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    GetChatList();
  }, []);
  return (
    <ChattingPageContainer>
      <div className="side-bar">
        <Title>채팅</Title>
        <ChatList chattingList={chattingList} />
      </div>
      <div className="content">
        <Routes>
          <Route path=":chatId" element={<ChatRoom />}></Route>
        </Routes>
      </div>
    </ChattingPageContainer>
  );
};

export default ChattingPage;
