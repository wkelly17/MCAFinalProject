import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'virtual:windi.css';
import './index.css';
// ! Dev tools;
import 'virtual:windi-devtools';
import { AppContextProvider } from '../AppContext';

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
