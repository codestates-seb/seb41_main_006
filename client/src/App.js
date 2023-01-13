import Header from './components/Header';
import GlobalStyle from './GlobalStyle';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import PostDetailPage from './pages/PostDetailPage';
import PostPage from './pages/PostPage';
import PostEditPage from './pages/PostEditPage';
import FindMatePage from './pages/FindMatePage';
import SignUpPage from './pages/SignUpPage';
import InputUserInfoPage from './pages/InputUserInfoPage';
import MyPage from './pages/MyPage';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Header></Header>
      <Routes>
        <Route path="/mate/posts/:mateId" element={<PostDetailPage />}></Route>
        <Route path="/newmate" element={<PostPage />}></Route>
        <Route
          path="/mate/posts/:mateId/edit"
          element={<PostEditPage />}
        ></Route>
        <Route path="/mate/*" element={<FindMatePage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/inputuserinfo" element={<InputUserInfoPage />}></Route>
        <Route path="/mypage/*" element={<MyPage />}></Route>
        <Route path="/*" element={<MainPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
