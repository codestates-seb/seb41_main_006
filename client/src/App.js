import Header from './components/Header';
import GlobalStyle from './GlobalStyle';
import { Routes, Route } from 'react-router-dom';
// import Container from './components/Container';
import FindMatePage from './pages/FindMatePage';
import PostDetailPage from './pages/PostDetailPage';
import PostPage from './pages/PostPage';
import PostEditPage from './pages/PostEditPage';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Header></Header>
      <Routes>
        <Route path="/mate" element={<FindMatePage />}></Route>
        <Route path="/mate-detail" element={<PostDetailPage />}></Route>
        <Route path="/post-mate" element={<PostPage />}></Route>
        <Route path="/post-edit" element={<PostEditPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
