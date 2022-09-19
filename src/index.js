import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import Blank from './Pages/Blank';
// import Blank from './Pages/Auth/ResetPassword';
// import Login from './Pages/Auth/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Blank />
    {/* <Login /> */}
  </React.StrictMode>
);