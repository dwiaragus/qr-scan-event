import React from 'react';
import ReactDOM from 'react-dom/client'; // Perhatikan ini
import App from './App';
import './index.css';

// Gunakan createRoot untuk React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
