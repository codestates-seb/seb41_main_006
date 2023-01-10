import Header from './components/Header';
import GlobalStyle from './GlobalStyle';
import { Routes, Route } from 'react-router-dom';

import FindMatePage from './pages/FindMatePage';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Header></Header>
      <Routes>
        <Route path="/mate" element={<FindMatePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
