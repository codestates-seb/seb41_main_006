import Header from './components/Header';
import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import { Routes, Route } from 'react-router-dom';
import FindMatePage from './pages/FindMatePage';
import SignUpPage from './pages/SignUpPage';

const Container = styled.div`
  padding-top: var(--header-height);
  background-color: var(--bg-dark-color);
  width: 100%;
  max-width: 980px;
  height: 100%;
  color: var(--main-color);
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Header></Header>
      <Container>
        <Routes>
          <Route path="/mate" element={<FindMatePage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
