import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './store/cart';
import './styles.css';

// "/" in dev, "/heron-demo-store/" on GitHub Pages. Vite fills this from `base`.
// React Router wants the basename without the trailing slash.
const base = import.meta.env.BASE_URL;
const basename = base.endsWith('/') ? base.slice(0, -1) : base;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
