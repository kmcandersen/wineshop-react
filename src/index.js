import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ShopProvider } from './context/shopContext';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from './styles/theme.js';
import App from './App';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ShopProvider>
        <ThemeProvider theme={customTheme}>
          <App />
        </ThemeProvider>
      </ShopProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
