import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';
import App from './App';
import GlobalModal from './components/GlobalModal';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <GlobalModal />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
