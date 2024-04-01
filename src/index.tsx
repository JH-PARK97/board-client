import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/font/font.css';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    throw new Error('Root element not found in the document.');
}
