import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'virtual:windi.css';
import './index.css';
// ! Dev tools;
import 'virtual:windi-devtools';
import { AppContextProvider } from '../AppContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
