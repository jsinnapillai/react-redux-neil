import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/layout/App.tsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './app/layout/styles.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes.tsx';
import { StoreProvider } from './api/context/StoreContext.tsx';
// import { configureStore } from './app/store/configureStore.ts';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore.ts';

// const store = configureStore();
 


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <StoreProvider>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
    </StoreProvider>
  </React.StrictMode>,
)
