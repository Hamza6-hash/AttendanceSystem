import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import authReducer from "./state/index"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: authReducer
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

