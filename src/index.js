import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Blank from './Pages/Blank';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] ='application/json';
axios.defaults.headers.post['Accept'] ='application/json';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Blank />
    {/* <Login /> */}
  </React.StrictMode>
);