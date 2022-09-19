import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Blank from './Pages/Blank';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Blank />
    {/* <Login /> */}
  </React.StrictMode>
);