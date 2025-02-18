import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Spin } from 'antd';

import store from '@/store';

import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<Spin size="large" fullscreen />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>

  // <StrictMode>
  // </StrictMode>
);
