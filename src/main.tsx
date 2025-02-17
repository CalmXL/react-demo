import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/store';

import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<h3>loading...</h3>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>

  // <StrictMode>
  // </StrictMode>
);
