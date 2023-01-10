import Header from './components/Header';
import GlobalStyle from './GlobalStyle';
import { Routes, Route } from 'react-router-dom';
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
        <Route path="/mate" element={<FindMatePage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/inputuserinfo" element={<InputUserInfoPage />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
