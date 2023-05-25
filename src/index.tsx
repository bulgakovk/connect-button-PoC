import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import EthereumConfig from './EthereumConfig';

import { Buffer } from 'buffer';

window.Buffer = Buffer

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
