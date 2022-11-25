import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import { storeConfig } from './Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={storeConfig}>
      <App />
    </Provider>
);

