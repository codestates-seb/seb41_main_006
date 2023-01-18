import Header from './components/Header';
import GlobalStyle from './GlobalStyle';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import BoardDetailPage from './pages/BoardDetailPage';
import BoardPage from './pages/BoardPage';
import BoardEditPage from './pages/BoardEditPage';
import FindMatePage from './pages/FindMatePage';
import SignUpPage from './pages/SignUpPage';
import InputMemberInfoPage from './pages/InputMemberInfoPage';
import MyPage from './pages/MyPage';
import ChattingPage from './pages/ChattingPage';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Header></Header>
      <Routes>
        <Route
          path="/mate/boards/:mateId"
          element={<BoardDetailPage />}
        ></Route>
        <Route path="/newmate" element={<BoardPage />}></Route>
        <Route
          path="/mate/boards/:mateId/edit"
          element={<BoardEditPage />}
        ></Route>
        <Route path="/mate/*" element={<FindMatePage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/inputMember" element={<InputMemberInfoPage />}></Route>
        <Route path="/mypage/*" element={<MyPage />}></Route>
        <Route path="/chat/*" element={<ChattingPage />}></Route>
        <Route path="/*" element={<MainPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
