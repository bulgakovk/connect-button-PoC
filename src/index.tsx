import React from 'react';
import ReactDOM from 'react-dom/client';

import '@rainbow-me/rainbowkit/styles.css';

import './index.css';
import App from './App';
import EthereumConfig from './EthereumConfig';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <EthereumConfig>
        <App />
    </EthereumConfig>
  </React.StrictMode>,
);
